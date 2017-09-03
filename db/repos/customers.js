module.exports = (rep, pgp) => {
   return{
      
      viewCustomers: values =>
        rep.any('SELECT * FROM Customer'),
        

   };
};
