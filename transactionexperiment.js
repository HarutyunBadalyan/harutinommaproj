const {UserBalance, sequelize} = require("./database/models/index");

async function sendMoney(senderId, toWhomId, howMuchMoney) {

    let transaction;
    try {
        transaction = await sequelize.transaction();
        const addbalance = await UserBalance.create({
            balanceChange: howMuchMoney,
            userId: toWhomId
        }, { transaction });
       const [totalsum, metadata] = await sequelize.query(`SELECT SUM("balanceChange") FROM public."UserBalances" where "userId" = ${senderId};`);
       console.log("total sum ", totalsum[0].sum)
       if(totalsum[0].sum <= 0) {
           throw "send money  is more than balance please decrease send money";
       }
       const decreasebalance = await UserBalance.create({
        balanceChange: -howMuchMoney,
            userId: senderId
        }, { transaction });

        console.log('success');
        await transaction.commit(); 

    } catch (error) {
        console.log(error)
        console.log('error');
        if(transaction) {
           await transaction.rollback();
        }
    }
}
sendMoney(28,16,100)