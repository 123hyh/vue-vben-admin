<template>
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
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>
    <FormItem name="validateCode" class="enter-x">
      <Input
        size="large"
        visibilityToggle
        v-model:value="formData.validateCode"
        placeholder="验证码"
        autocomplete="off"
        class="fix-auto-fill validate-code-wrap"
      >
        <template #addonAfter>
          <img
            title="点击切换验证码"
            :src="validateCodeSrc"
            alt=""
            @click.stop="() => (validateCodeRandom = Math.random())"
        /></template>
      </Input>
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
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
    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
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
  import LoginFormTitle from './LoginFormTitle.vue';

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
  const { prefixCls } = useDesign('login');
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
  :deep(.validate-code-wrap) {
    & > .ant-input-wrapper {
      @apply flex !important;

      #form_item_validateCode {
        flex: 6;
        min-width: initial;
      }

      > .ant-input-group-addon {
        flex-grow: 1;
        padding: 0;
        width: 100px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
