const Mock=require('mockjs');

let db=Mock.mock({
    'data|3-6':[{
        email:'@email',
        password:'@password',
    }]
});

module.exports={
    [`GET /api/users`](req,res){

        res.status(200).json(db);
    },

    [`POST /api/users`](req,res){

        let user=req.body;
        console.log(req);
        user.email=Mock.mock('@email');
        db.data.push(user);
        
        res.status(200).json(user);
    }
}