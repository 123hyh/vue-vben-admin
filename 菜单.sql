SELECT
	* 
FROM
	sys_menu t1
	JOIN sys_menu t2 on t2.menu_id = t1.parent_id 
WHERE
	t1.menu_name = '基础资料' AND t2.menu_name = '供应链管理';
	
	
UPDATE sys_menu  set url = '/supplierChain' WHERE menu_name = '供应链管理' and menu_type = 'M';

UPDATE sys_menu  set url = 'crm' WHERE menu_name = '客户管理' and menu_type = 'M';

UPDATE sys_menu  set url = 'commission' WHERE menu_name = '客户管理' and menu_type = 'M';

UPDATE sys_menu t1
JOIN sys_menu t2 ON t2.menu_id = t1.parent_id 
SET t1.url = 'bas' 
WHERE
	t1.menu_name = '基础资料' 
	AND t2.menu_name = '供应链管理' 
	AND t1.menu_type = 'M';
	

UPDATE sys_menu t1
JOIN sys_menu t2 ON t2.menu_id = t1.parent_id 
SET t1.url = 'order' 
WHERE
	t1.menu_name = '订单管理' 
	AND t2.menu_name = '供应链管理' 
	AND t1.menu_type = 'M';
	

UPDATE sys_menu t1
JOIN sys_menu t2 ON t2.menu_id = t1.parent_id 
SET t1.url = 'finance' 
WHERE
	t1.menu_name = '财务管理' 
	AND t2.menu_name = '供应链管理' 
	AND t1.menu_type = 'M';


UPDATE sys_menu t1
JOIN sys_menu t2 ON t2.menu_id = t1.parent_id 
SET t1.url = 'arap' 
WHERE
	t1.menu_name = '台账管理' 
	AND t2.menu_name = '财务管理' 
	AND t1.menu_type = 'M';

SELECT
	* 
FROM
	sys_menu 
WHERE
	menu_name IN ( '仓库管理' );
UPDATE sys_menu 
SET url = '/system' 
WHERE
	menu_name = '系统管理' 
	AND menu_type = 'M';
UPDATE sys_menu 
SET url = 'operlog' 
WHERE
	menu_name = '日志管理' 
	AND menu_type = 'M';
UPDATE sys_menu 
SET url = '/tool' 
WHERE
	menu_name = '系统工具' 
	AND menu_type = 'M';
UPDATE sys_menu 
SET url = 'receipt' 
WHERE
	menu_name = '收款管理' 
	AND menu_type = 'M';
UPDATE sys_menu 
SET url = 'pay' 
WHERE
	menu_name = '付款管理' 
	AND menu_type = 'M';
UPDATE sys_menu 
SET url = 'settlement' 
WHERE
	menu_name = '结算管理' 
	AND menu_type = 'M';
UPDATE sys_menu 
SET url = 'monStateMagment' 
WHERE
	menu_name = '月结对账单' 
	AND menu_type = 'M';
UPDATE sys_menu 
SET url = 'openInvoice' 
WHERE
	menu_name = '开票管理' 
	AND menu_type = 'M';
	
	
UPDATE sys_menu 
SET url = 'collectInvoice' 
WHERE
	menu_name = '收票管理' 
	AND menu_type = 'M';
UPDATE sys_menu 
SET url = 'ticket' 
WHERE
	menu_name = '票证管理' 
	AND menu_type = 'M';
UPDATE sys_menu 
SET url = 'bill' 
WHERE
	menu_name = '结账管理' 
	AND menu_type = 'M';
	
	
UPDATE sys_menu 
SET url = 'forex' 
WHERE
	menu_name = '购汇管理' 
	AND menu_type = 'M';
UPDATE sys_menu 
SET url = 'claimPlchk' 
WHERE
	menu_name = '汇兑管理' 
	AND menu_type = 'M';
UPDATE sys_menu 
SET url = '/wms' 
WHERE
	menu_name = '仓储管理' 
	AND menu_type = 'M';
	
	
UPDATE sys_menu t1
JOIN sys_menu t2 ON t2.menu_id = t1.parent_id 
SET t1.url = 'bas' 
WHERE
	t1.menu_name = '基础资料' 
	AND t2.menu_name = '仓储管理';
UPDATE sys_menu t1
JOIN sys_menu t2 ON t2.menu_id = t1.parent_id 
SET t1.url = 'inbound' 
WHERE
	t1.menu_name = '入库管理' 
	AND t2.menu_name = '仓储管理';
	
	
UPDATE sys_menu t1
JOIN sys_menu t2 ON t2.menu_id = t1.parent_id 
SET t1.url = 'outbound' 
WHERE
	t1.menu_name = '出库管理' 
	AND t2.menu_name = '仓储管理';
	
SELECT * from sys_menu WHERE menu_name = '运输管理';

UPDATE sys_menu set url = '/tms' WHERE menu_name = '运输管理';

UPDATE sys_menu t1 JOIN sys_menu t2 on t2.menu_id = t1.parent_id set t1.url = 'bas' WHERE t1.menu_name = '基础资料' AND t2.menu_name = '运输管理';

UPDATE sys_menu t1 JOIN sys_menu t2 on t2.menu_id = t1.parent_id set t1.url = 'import' WHERE t1.menu_name = '进口运输' AND t2.menu_name = '运输管理';

UPDATE sys_menu t1 JOIN sys_menu t2 on t2.menu_id = t1.parent_id set t1.url = 'export' WHERE t1.menu_name = '出口运输' AND t2.menu_name = '运输管理';

UPDATE sys_menu t1 JOIN sys_menu t2 on t2.menu_id = t1.parent_id set t1.url = 'domestic' WHERE t1.menu_name = '国内运输' AND t2.menu_name = '运输管理';

UPDATE sys_menu t1 JOIN sys_menu t2 on t2.menu_id = t1.parent_id set t1.url = 'local' WHERE t1.menu_name = '本港运输' AND t2.menu_name = '运输管理';

UPDATE sys_menu set url = '/custom' WHERE menu_name = '关务管理';

UPDATE sys_menu t1 join sys_menu t2 on t1.parent_id = t2.menu_id set t1.url = 'bas' WHERE t1.menu_name = '基础资料' AND t2.menu_name = '关务管理';

UPDATE sys_menu t1 join sys_menu t2 on t1.parent_id = t2.menu_id set t1.url = 'classifyIns' WHERE t1.menu_name = '归类管理' AND t2.menu_name = '关务管理';

UPDATE sys_menu t1 join sys_menu t2 on t1.parent_id = t2.menu_id set t1.url = 'auditpriceIns' WHERE t1.menu_name = '审价管理' AND t2.menu_name = '关务管理';

UPDATE sys_menu t1 join sys_menu t2 on t1.parent_id = t2.menu_id set t1.url = 'customs' WHERE t1.menu_name = '报关管理' AND t2.menu_name = '关务管理';

UPDATE sys_menu t1 join sys_menu t2 on t1.parent_id = t2.menu_id set t1.url = 'stgcmaterial' WHERE t1.menu_name = '战略物资' AND t2.menu_name = '关务管理';

UPDATE sys_menu set url = '/exp' WHERE menu_name = '费用管理';

UPDATE sys_menu t1 join sys_menu t2 on t1.parent_id = t2.menu_id set t1.url = 'bas' WHERE t1.menu_name = '基础资料' AND t2.menu_name = '费用管理';

UPDATE sys_menu t1 join sys_menu t2 on t1.parent_id = t2.menu_id set t1.url = 'ap' WHERE t1.menu_name = '应付费用管理' AND t2.menu_name = '费用管理';

UPDATE sys_menu t1 join sys_menu t2 on t1.parent_id = t2.menu_id set t1.url = 'ar' WHERE t1.menu_name = '应收费用管理' AND t2.menu_name = '费用管理';

UPDATE sys_menu set url = '/risk' WHERE menu_name = '风控管理';

UPDATE sys_menu set url = '/companyManage' WHERE menu_name = '公司管理';

UPDATE sys_menu t1 JOIN sys_menu t2 on t2.parent_id = t1.menu_id set t2.url = 'b2b' WHERE t1.menu_name = '公司管理' and t2.menu_name = 'B2B';

UPDATE sys_menu t1 JOIN sys_menu t2 on t2.parent_id = t1.menu_id set t2.url = 'report' WHERE t1.menu_name = '公司管理' and t2.menu_name = '报表管理';

UPDATE sys_menu t1 JOIN sys_menu t2 on t2.parent_id = t1.menu_id set t2.url = 'file' WHERE t1.menu_name = '公司管理' and t2.menu_name = '附档管理';

UPDATE sys_menu t1 JOIN sys_menu t2 on t2.parent_id = t1.menu_id set t2.url = 'process' WHERE t1.menu_name = '公司管理' and t2.menu_name = '流程管理';

UPDATE sys_menu t1 JOIN sys_menu t2 on t2.parent_id = t1.menu_id set t2.url = 'bi' WHERE t1.menu_name = '公司管理' and t2.menu_name = 'BI';

UPDATE sys_menu t1 JOIN sys_menu t2 on t2.parent_id = t1.menu_id set t2.url = 'busi' WHERE t1.menu_name = '报表管理' and t2.menu_name = '商务报表';

UPDATE sys_menu t1 JOIN sys_menu t2 on t2.parent_id = t1.menu_id set t2.url = 'customs' WHERE t1.menu_name = '报表管理' and t2.menu_name = '关务报表';

UPDATE sys_menu t1 JOIN sys_menu t2 on t2.parent_id = t1.menu_id set t2.url = 'finance' WHERE t1.menu_name = '报表管理' and t2.menu_name = '财务报表';

UPDATE sys_menu t1 JOIN sys_menu t2 on t2.parent_id = t1.menu_id set t2.url = 'risk' WHERE t1.menu_name = '报表管理' and t2.menu_name = '风控报表';

UPDATE sys_menu t1 JOIN sys_menu t2 on t2.parent_id = t1.menu_id set t2.url = 'finAccounting' WHERE t1.menu_name = '报表管理' and t2.menu_name = '核算报表';

UPDATE sys_menu t1 JOIN sys_menu t2 on t2.parent_id = t1.menu_id set t2.url = 'logistics' WHERE t1.menu_name = '报表管理' and t2.menu_name = '物流报表';

UPDATE sys_menu t1 JOIN sys_menu t2 on t2.parent_id = t1.menu_id set t2.url = 'warehouse' WHERE t1.menu_name = '报表管理' and t2.menu_name = '仓库报表';

UPDATE sys_menu t1 JOIN sys_menu t2 on t2.parent_id = t1.menu_id set t2.url = 'sales' WHERE t1.menu_name = '报表管理' and t2.menu_name = '业务报表';






SELECT * FROM sys_menu WHERE menu_name ='报关管理'

SELECT   t1.url ,t1.menu_name , t2.menu_name FROM  sys_menu t1 JOIN sys_menu t2 on t2.menu_id = t1.parent_id  WHERE t1.menu_name = '基础资料';