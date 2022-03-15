<template>
  <div :class="`${prefixCls}`" class="px-14 pt-20">
    <LoginFormTitle v-show="getShow" class="enter-x" />
    <Form
      class="p-4 enter-x"
      :model="formData"
      :rules="getFormRules"
      ref="formRef"
      v-show="getShow"
      @keypress.enter="handleLogin"
    >
      <FormItem name="account" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.accountPlaceholder')"
          class="fix-auto-fill !border-0"
        />
      </FormItem>
      <FormItem name="password" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.password"
          :placeholder="t('sys.login.passwordPlaceholder')"
          class="!border-0"
        />
      </FormItem>
      <FormItem name="validateCode" class="enter-x">
        <div class="flex">
          <Input
            size="large"
            visibilityToggle
            v-model:value="formData.validateCode"
            :placeholder="t('sys.login.smsPlaceholder')"
            autocomplete="off"
            class="fix-auto-fill validate-code-wrap !border-0"
          />
          <img
            title="点击切换验证码"
            :src="validateCodeSrc"
            alt=""
            style="height: 35px"
            @click.stop="() => (validateCodeRandom = Math.random())"
          />
        </div>
      </FormItem>

      <ARow class="enter-x">
        <ACol :span="12">
          <FormItem>
            <!-- No logic, you need to deal with it yourself -->
            <Checkbox v-model:checked="rememberMe" size="small">
              <span class="ant-btn-link">{{ t('sys.login.rememberMe') }}</span>
            </Checkbox>
          </FormItem>
        </ACol>
        <ACol :span="12">
          <FormItem :style="{ 'text-align': 'right' }">
            <!-- No logic, you need to deal with it yourself -->
            <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
              {{ t('sys.login.forgetPassword') }}
            </Button>
          </FormItem>
        </ACol>
      </ARow>
      <FormItem class="enter-x mt-12">
        <Button type="primary" block @click="handleLogin" :loading="loading">
          {{ t('sys.login.loginButton') }}
        </Button>
        <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        {{ t('sys.login.registerButton') }}
      </Button> -->
      </FormItem>
      <template v-if="false">
        <ARow class="enter-x">
          <ACol :md="8" :xs="24">
            <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
              {{ t('sys.login.mobileSignInFormTitle') }}
            </Button>
          </ACol>
          <ACol :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
            <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
              {{ t('sys.login.qrSignInFormTitle') }}
            </Button>
          </ACol>
          <ACol :md="7" :xs="24">
            <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
              {{ t('sys.login.registerButton') }}
            </Button>
          </ACol>
        </ARow>

        <Divider class="enter-x">{{ t('sys.login.otherSignIn') }}</Divider>
        <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`">
          <GithubFilled />
          <WechatFilled />
          <AlipayCircleFilled />
          <GoogleCircleFilled />
          <TwitterCircleFilled />
        </div>
      </template>
    </Form>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';

  import { Checkbox, Form, Input, Row, Col, Button, Divider } from 'ant-design-vue';
  import {
    GithubFilled,
    WechatFilled,
    AlipayCircleFilled,
    GoogleCircleFilled,
    TwitterCircleFilled,
  } from '@ant-design/icons-vue';
  import LoginFormTitle from './_LoginFormTitle.vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';
  //import { onKeyStroke } from '@vueuse/core';
  import { useGlobSetting } from '/@/hooks/setting';
  import { isDevMode } from '../../../utils/env';
  const isDev = isDevMode();
  const { apiUrl } = useGlobSetting();
  const ACol = Col;
  const ARow = Row;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { notification, createErrorModal } = useMessage();
  const { prefixCls } = useDesign('login-password');
  const userStore = useUserStore();

  const { setLoginState, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);
  const rememberMe = ref(false);

  const formData = reactive({
    account: isDev ? 'super' : '',
    password: isDev ? 'zhyfyl1996' : '',
    validateCode: '',
  });
  const validateCodeSrc = computed(
    () => `${apiUrl}/captcha/captchaImage?type=math&s=${unref(validateCodeRandom)}`,
  );
  const validateCodeRandom = ref(Math.random());

  const { validForm } = useFormValid(formRef);

  //onKeyStroke('Enter', handleLogin);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
      const userInfo = await userStore.login({
        password: data.password,
        username: data.account,
        mode: 'none', //不要默认的错误提示
        validateCode: data.validateCode,
        rememberMe: unref(rememberMe),
      });
      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${data.account}`,
          duration: 3,
        });
      }
    } catch (error) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      });
    } finally {
      loading.value = false;
    }
  }
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-login-password';
  .@{prefix-cls} {
    :deep(.ant-input) {
      @apply bg-blue-400/10 border-0 !important;
    }

    :deep(.ant-input-affix-wrapper) {
      @apply bg-blue-400/10 border-0 !important;
    }
  }
</style>
