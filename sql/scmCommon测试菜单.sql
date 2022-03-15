

UPDATE sys_menu set url='/crm' WHERE menu_name = '客户管理' AND parent_id = 0;
UPDATE sys_menu set url='/system' WHERE menu_name = '系统管理' AND parent_id = 0;
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='log' WHERE t1.menu_name = '日志管理' AND t2.menu_name = '系统管理';
UPDATE sys_menu set url='/monitor' WHERE menu_name = '系统监控' AND parent_id = 0;
UPDATE sys_menu set url='/bas' WHERE menu_name = '基础资料' AND parent_id = 0;
UPDATE sys_menu set url='/order' WHERE menu_name = '订单管理' AND parent_id = 0; 
UPDATE sys_menu set url='/custom' WHERE menu_name = '关务管理' AND parent_id = 0; 
UPDATE sys_menu set url='/wms' WHERE menu_name = '仓储管理' AND parent_id = 0; 
UPDATE sys_menu set url='/tms' WHERE menu_name = '运输管理' AND parent_id = 0; 
UPDATE sys_menu set url='/finance' WHERE menu_name = '财务管理' AND parent_id = 0; 
UPDATE sys_menu set url='/exp' WHERE menu_name = '费用管理' AND parent_id = 0; 
UPDATE sys_menu set url='/risk' WHERE menu_name = '风控管理' AND parent_id = 0;
UPDATE sys_menu set url='/companyManage' WHERE menu_name = '公司管理' AND parent_id = 0;

UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='bas' WHERE t1.menu_name = '基础资料' AND t2.menu_name = '关务管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='classifyIns' WHERE t1.menu_name = '归类管理' AND t2.menu_name = '关务管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='auditpriceIns' WHERE t1.menu_name = '审价管理' AND t2.menu_name = '关务管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='customs' WHERE t1.menu_name = '报关管理' AND t2.menu_name = '关务管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='stgcmaterial' WHERE t1.menu_name = '战略物资' AND t2.menu_name = '关务管理';

UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='bas' WHERE t1.menu_name = '基础资料' AND t2.menu_name = '仓储管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='inbound' WHERE t1.menu_name = '入库管理' AND t2.menu_name = '仓储管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='outbound' WHERE t1.menu_name = '出库管理' AND t2.menu_name = '仓储管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='inventory' WHERE t1.menu_name = '库存管理' AND t2.menu_name = '仓储管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='query' WHERE t1.menu_name = '库存查询' AND t2.menu_name = '库存管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='remove' WHERE t1.menu_name = '库存移库' AND t2.menu_name = '库存管理';



UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='bas' WHERE t1.menu_name = '基础资料' AND t2.menu_name = '运输管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='import' WHERE t1.menu_name = '进口运输' AND t2.menu_name = '运输管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='domestic' WHERE t1.menu_name = '国内运输' AND t2.menu_name = '运输管理';

UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='arap' WHERE t1.menu_name = '台账管理' AND t2.menu_name = '财务管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='receipt' WHERE t1.menu_name = '收款管理' AND t2.menu_name = '财务管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='pay' WHERE t1.menu_name = '付款管理' AND t2.menu_name = '财务管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='settlement' WHERE t1.menu_name = '结算管理' AND t2.menu_name = '财务管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='openInvoice' WHERE t1.menu_name = '开票管理' AND t2.menu_name = '财务管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='collectInvoice' WHERE t1.menu_name = '收票管理' AND t2.menu_name = '财务管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='ticket' WHERE t1.menu_name = '票证管理' AND t2.menu_name = '财务管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='bill' WHERE t1.menu_name = '结账管理' AND t2.menu_name = '财务管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='forex' WHERE t1.menu_name = '购汇管理' AND t2.menu_name = '财务管理';


UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='bas' WHERE t1.menu_name = '基础资料' AND t2.menu_name = '费用管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='ap' WHERE t1.menu_name = '应付费用管理' AND t2.menu_name = '费用管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='ar' WHERE t1.menu_name = '应收费用管理' AND t2.menu_name = '费用管理';


UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='report' WHERE t1.menu_name = '报表管理' AND t2.menu_name = '公司管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='busi' WHERE t1.menu_name = '商务报表' AND t2.menu_name = '报表管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='customs' WHERE t1.menu_name = '关务报表' AND t2.menu_name = '报表管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='finance' WHERE t1.menu_name = '财务报表' AND t2.menu_name = '报表管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='sales' WHERE t1.menu_name = '业务报表' AND t2.menu_name = '报表管理';

UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='file' WHERE t1.menu_name = '附档管理' AND t2.menu_name = '公司管理';
UPDATE sys_menu t1 join sys_menu t2 on t2.menu_id = t1.parent_id set t1.url='process' WHERE t1.menu_name = '流程管理' AND t2.menu_name = '公司管理';





 


