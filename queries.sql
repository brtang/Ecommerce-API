/* Query to select categories purchased by specified Customer_Id 

SELECT c.Customer_Id, c.first_name, pc.Category_Id, cg.name, cop.quantity 
FROM Customer_Orders p INNER JOIN Customer_Ordered_Product cop ON p.Order_Id = cop.Order_Id
INNER JOIN Customer c ON p.Customer_Id = c.Customer_Id
INNER JOIN Products_to_Category pc ON pc.Product_Id = cop.Product_Id
INNER JOIN Category cg ON cg.Category_Id = pc.Category_Id
WHERE p.Customer_Id = 1;
*/

/* Return orders for a customer 

SELECT p.Customer_Id, p.Order_Id, p.Time_stamp, p.status, cop.Product_Id, cop.quantity
FROM Customer_Orders p INNER JOIN Customer_Ordered_Product cop ON p.Order_Id = cop.Order_Id
WHERE p.Customer_Id = 1 
ORDER BY Product_Id;
*/

/* Return orders within a given date range */

SELECT date_part('year', p.Time_stamp::date) as yearly, date_part('week', p.Time_stamp::date) as weekly, cop.Product_Id, pd.name, SUM(cop.quantity) AS units_sold
FROM Customer_Orders p INNER JOIN Customer_Ordered_Product cop ON p.Order_Id = cop.Order_Id
INNER JOIN Products pd ON cop.Product_Id = pd.Product_Id
GROUP BY  yearly, weekly, cop.Product_Id, pd.name
ORDER BY yearly, weekly; 


/* WHERE p.Time_stamp BETWEEN '1/7/1999' AND '1/9/1999' */

/*
SELECT Product_Id, SUM(quantity) 
FROM Customer_Ordered_Product
GROUP BY Product_Id;
*/