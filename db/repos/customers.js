module.exports = (rep, pgp) => {
   return{
      
      viewCustomers: values =>
        rep.any('SELECT * FROM Customer'),
        
      returnCustomersOrder: values => 
        rep.any('SELECT p.Customer_Id, p.Order_Id, p.Time_stamp, cop.Product_Id, pd.name, cop.quantity, p.status \
                FROM Customer_Orders p \
                INNER JOIN Customer_Ordered_Product cop ON p.Order_Id = cop.Order_Id \
                INNER JOIN Products pd ON cop.Product_Id = pd.Product_Id\
                WHERE p.Customer_Id = ${customer_id} \
                ORDER BY Product_Id', values),
        
      viewCustomerCategories: values =>
        rep.any('SELECT c.Customer_Id, c.first_name as customer_first_name, pc.Category_Id, cg.name as category_name, SUM(cop.quantity) as number_purchased FROM Customer_Orders p \
                INNER JOIN Customer_Ordered_Product cop ON p.Order_Id = cop.Order_Id \
                INNER JOIN Customer c ON p.Customer_Id = c.Customer_Id \
                INNER JOIN Products_to_Category pc ON pc.Product_Id = cop.Product_Id \
                INNER JOIN Category cg ON cg.Category_Id = pc.Category_Id \
                GROUP BY c.Customer_Id, customer_first_name, pc.Category_Id, category_name \
                ORDER BY c.Customer_Id'),
      

      returnProductsByMonth: values =>
        rep.any('SELECT date_part(\'year\', p.Time_stamp::date) as year, date_part(\'month\', p.Time_stamp::date) as month, cop.Product_Id, pd.name, SUM(cop.quantity) AS units_sold \
                FROM Customer_Orders p INNER JOIN Customer_Ordered_Product cop ON p.Order_Id = cop.Order_Id \
                INNER JOIN Products pd ON cop.Product_Id = pd.Product_Id \
                WHERE p.Time_stamp BETWEEN ${startDate} AND ${endDate} \
                GROUP BY year, month, cop.Product_Id, pd.name \
                ORDER BY year, month', values),
      
      returnProductsByWeek: values =>
        rep.any('SELECT date_part(\'year\', p.Time_stamp::date) as year, date_part(\'month\', p.Time_stamp::date) as month, date_part(\'week\', p.Time_stamp::date) as week, cop.Product_Id, pd.name, SUM(cop.quantity) AS units_sold \
                FROM Customer_Orders p INNER JOIN Customer_Ordered_Product cop ON p.Order_Id = cop.Order_Id \
                INNER JOIN Products pd ON cop.Product_Id = pd.Product_Id \
                WHERE p.Time_stamp BETWEEN ${startDate} AND ${endDate} \
                GROUP BY year, month, week, cop.Product_Id, pd.name \
                ORDER BY year, month, week', values),
        
        
      returnProductBreakdown: values =>
        rep.any('SELECT date_part(\'year\', p.Time_stamp::date) as year, date_part(\'month\', p.Time_stamp::date) as month, date_part(\'week\', p.Time_stamp::date) as week, date_part(\'day\', p.Time_stamp::date) as day, cop.Product_Id, pd.name, SUM(cop.quantity) AS units_sold\
                FROM Customer_Orders p INNER JOIN Customer_Ordered_Product cop ON p.Order_Id = cop.Order_Id \
                INNER JOIN Products pd ON cop.Product_Id = pd.Product_Id \
                WHERE p.Time_stamp BETWEEN ${startDate} AND ${endDate} \
                GROUP BY year, month, week, day, cop.Product_Id, pd.name \
                ORDER BY year, month, week, day', values)     
   };
};
