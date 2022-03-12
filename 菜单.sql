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