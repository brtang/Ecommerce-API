/* Return categories purchased */

SELECT c.Customer_Id, c.first_name as customer_first_name, pc.Category_Id, cg.name as category_name, SUM(cop.quantity) as number_purchased
FROM Customer_Orders p INNER JOIN Customer_Ordered_Product cop ON p.Order_Id = cop.Order_Id
INNER JOIN Customer c ON p.Customer_Id = c.Customer_Id
INNER JOIN Products_to_Category pc ON pc.Product_Id = cop.Product_Id
INNER JOIN Category cg ON cg.Category_Id = pc.Category_Id
GROUP BY c.Customer_Id, customer_first_name, pc.Category_Id, category_name
ORDER BY c.Customer_Id;

/* Return orders for a customer */

SELECT p.Customer_Id, p.Order_Id, p.Time_stamp, p.status, cop.Product_Id, cop.quantity
FROM Customer_Orders p INNER JOIN Customer_Ordered_Product cop ON p.Order_Id = cop.Order_Id
WHERE p.Customer_Id = 1 
ORDER BY Customer_Id;

/* Return orders within a given date range  */

SELECT date_part('year', p.Time_stamp::date) as year, date_part('week', p.Time_stamp::date) as week, date_part('day', p.Time_stamp::date) as day, cop.Product_Id, pd.name, SUM(cop.quantity) AS units_sold
FROM Customer_Orders p INNER JOIN Customer_Ordered_Product cop ON p.Order_Id = cop.Order_Id
INNER JOIN Products pd ON cop.Product_Id = pd.Product_Id
WHERE p.Time_stamp BETWEEN '1/7/1999' AND '1/20/1999'
GROUP BY year, week, day, cop.Product_Id, pd.name
ORDER BY year, week, day; 


