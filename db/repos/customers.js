module.exports = (rep, pgp) => {
   return{
      
      viewCustomers: values =>
        rep.any('SELECT * FROM Customer'),
        
       returnCustomersOrder: values => 
        rep.any('SELECT p.Customer_Id, p.Order_Id, p.Time_stamp, p.status, cop.Product_Id, cop.quantity FROM Customer_Orders p INNER JOIN Customer_Ordered_Product cop ON p.Order_Id = cop.Order_Id WHERE p.Customer_Id = ${customer_id} ORDER BY Product_Id', values)
   };
};
