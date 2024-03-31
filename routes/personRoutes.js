const express = require('express');
const router = express.Router();
const Person = require('./../person');

router.get('/', (req, res) => {
    res.send('work done');
    console.log('wonderful');
    
})

router.post('/', async(req,res) => {
    try{
        const data = req.body;
        const newPerson = new Person(data);
        const savedPerson = await newPerson.save();
        console.log('data saved');
        res.status(200).json(savedPerson);
    }

    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
    
})

router.get( '/:workType' , async( req, res) => {
    try{
        const workType = req.params.workType;
        if( workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }

        else{
            res.status(404).json( { error: 'Invalid work type'});
        }
    }

    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server Error'})
    }
});


router.put('/:id', async ( req, res) => {
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //Return the update document
            runValidators: true, //Run Mongoose Validation eg - required
        })

        if( !response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
    }

    catch(err){
        console.log(err);
        res.status(500).json({err: 'Internal Server Error'});
    }
});

router.delete( '/:id', async (req,res) => {
    try{
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({ error: 'Person not found'});
        }
        console.log('data delete');
        res.status(200).json({message : 'person Deleted Successfluly'});
    }
    catch(err){
        console.log('err');
        res.status(500).json({err : 'Internal Server Error'});
    }
})

module.exports = router;
