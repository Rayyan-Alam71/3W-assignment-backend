import express from 'express'
import { ClaimPointsHistory, User } from '../db/models.js';

export const router = express.Router()

// test route
router.get('/', async (req, res)=>{
    return res.status(200).json({
        msg: 'routes working'
    })
})

// route to get all the users
router.get('/users', async (req , res) =>{
    
    try{
        const userList = await User.find({}).sort({points: -1})
        return res.status(200).json({
            users : userList
        })
    }catch(e){
        console.log(e)
        return res.status(500).send("User not found")
    }

})

// route to claim points to a user, using his userId
router.post('/claimPoints',async (req, res)=>{
    const { userId } = req.body;

    try{
        // generating random points in the range of [1,10]
        const randomPoints = Math.ceil(Math.random()*10)

        // update the user with randomPoints generated
        const user_updated = await User.findByIdAndUpdate(userId , 
            {points: randomPoints}
        )
        if(!user_updated){
            return res.status(403).json({
                msg : 'Invalid user'
            }) 
        }

        // add the claimPoints and the time of claim, into the ClaimPointHistory for the particular user
        const claims_history = await ClaimPointsHistory.create({
            userId : userId,
            claimedPoints : randomPoints,
            claimedAt : Date.now()
        })
        
        return res.json({
            msg : 'points added successfully',
            user_updated
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            msg: 'Error occured'
        })
    }
})

router.post('/addUser' , async (req, res)=>{
    const { username } = req.body;
    try{
        // check if the user already exist
        const userExisted = await User.findOne({
            username : username
        })

        if(userExisted) {
            return res.status(200).send('user already exist')
        }

        // if not, then add the user
        const user = await User.create({
            username : username
        })
        return res.status(200).json({
            msg : 'User created successfully'
        })
    }catch(e){
        return res.status(500).json({
            msg : 'Error occurred while adding user'
        })
    }
})
