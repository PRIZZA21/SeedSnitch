const asyncHandler = require('express-async-handler');
const Application_Model = require('../models/Application_Model');
const Application = require('../models/Application_Model');
const Incubator_Model = require('../models/Incubator_Model');
const User_Model = require('../models/User_Model');



// Service to shift applications after 24 hrs


const applications24hrchecker = asyncHandler(async()=>{

    const incubators = await Incubator_Model.find();

    for(let i =0;i<incubators.length;i++){

        let applications_of_this = incubators[i].applications_submitted

        for(let j=0;j<applications_of_this.length;j++){
            let timestamp2= new Date()
            let timestamp1 = applications_of_this[j].timestamp
            let diffInseonds = Math.round((timestamp2.getTime() - timestamp1.getTime()) / 1000);
            if(diffInseonds>86400) shiftApplication(incubators[i]._id,applications_of_this[j].application_id)
      }
    }
})


const shiftApplication = asyncHandler(async(inc_id,application_id) => {

    const currentIncubatorassigned = await Incubator_Model.findById(inc_id);
    const incubators = await Incubator_Model.find();
    let currentIncubator = incubators[0];
    let currApplications =1000;

    for(let i=0;i<incubators.length;i++){
        let appln_now = incubators[i].applications_submitted.length;
        if(appln_now<currApplications && incubators[i]!==currentIncubatorassigned){ 
            currApplications = incubators[i].applications_submitted.length;
            currentIncubator = incubators[i];
        }
    }

    await Application.updateOne(
        { _id: application_id },
        { $set: { assigned_incubator: currentIncubator._id } }
    );

    await Incubator_Model.updateOne({_id:inc_id},
        { $pull: 
            { applications_submitted:  { application_id: application_id }} 
        }
    );

    await Incubator_Model.updateOne({_id:currentIncubator._id},
        { $push: 
            { applications_submitted:  { application_id: application_id, timestamp: new Date() }} 
        }
    );
})




const not_have_appln =  asyncHandler((id,appln_id,incubators)=> {
    let inc = null;
    for(let i=0;i<incubators.length;i++) if(incubators[i]._id===id) inc = incubators[i]
    let rejected_applns = inc.applications_rejected;
    let b =true;
 
    for(let i=0;i<rejected_applns.length;i++){
        if((rejected_applns[i].application_id.toString())===appln_id.toString()) { b=false; break;}
    }
    return b;
})
  


const reassignApplication = asyncHandler(async() => {

    try {
  
      const applications = await Application_Model.find();
      const incubators = await Incubator_Model.find();
      
      for (let i = 0; i < applications.length; i++) 
        if (applications[i].assigned_incubator === null ) {

            let currentIncubator = incubators[i % incubators.length];
            let currApplications =1000;

            for(let j=0;j<incubators.length;j++){
                let check =  await not_have_appln(incubators[j]._id,applications[i]._id,incubators);
                let appln_now = incubators[j].applications_submitted.length;
                if(appln_now<=currApplications && check){ 
                    currApplications = incubators[j].applications_submitted.length;
                    currentIncubator = incubators[j];
                }
            }

            if(not_have_appln(currentIncubator._id,applications[i]._id,incubators)){
                await Application.updateOne(
                    { _id: applications[i]._id },
                    { $set: { curr_status: "Rejected" } }
                );
                return ;
            }
  
            await Application_Model.updateOne({ _id: applications[i]._id },
                { $set: { assigned_incubator: currentIncubator._id } }
            );
    
            await Incubator_Model.updateOne(
                {_id:currentIncubator._id},
                { $push: { applications_submitted:  {  application_id: applications[i]._id,  timestamp: new Date() }}}
            );

        }
    } 
    
    catch (err) {
      console.log(err);
    }

  })

  
const assignApplication = asyncHandler(async() => {

    try {
  
      const applications = await Application_Model.find();
      const incubators = await Incubator_Model.find();
      
      for (let i = 0; i < applications.length; i++) 
        if (applications[i].assigned_incubator === null ) {

            let currentIncubator = incubators[i % incubators.length];
            let currApplications =1000;

            for(let j=0;j<incubators.length;j++){
                let check =  await not_have_appln(incubators[j]._id,applications[i]._id,incubators);
                let appln_now = incubators[j].applications_submitted.length;
                if(appln_now<=currApplications && check){ 
                    currApplications = incubators[j].applications_submitted.length;
                    currentIncubator = incubators[j];
                }
            }

            if(!not_have_appln(currentIncubator._id,applications[i]._id,incubators)){
                await Application.updateOne(
                    { _id: applications[i]._id },
                    { $set: { curr_status: "Rejected" } }
                );
                return ;
            }
  
            await Application_Model.updateOne({ _id: applications[i]._id },
                { $set: { assigned_incubator: currentIncubator._id } }
            );
    
            await Incubator_Model.updateOne(
                {_id:currentIncubator._id},
                { $push: { applications_submitted:  {  application_id: applications[i]._id,  timestamp: new Date() }}}
            );

        }
    } 
    
    catch (err) {
      console.log(err);
    }

  })

  



/* 
    @description This route gives all applications in database
    @method Get
    @route /api/applications/
*/

exports.getAllApplications = asyncHandler(async(req,res) => {
    applications24hrchecker();
    const pageSize = 4

    const page = Number(req.query.pageNumber) || 1 
    const keyword = req.query.keyword?{
        name:{
            $regex: req.query.keyword,
            $options: 'i'
        }
    }: {}
    const count = await Application_Model.count({...keyword})

    let all_applications = await Application_Model
    .find({...keyword})
    .populate("creator", "name -_id")
    .populate("assigned_incubator","name email")
    .sort({createdAt: -1})
    .limit(pageSize)
    .skip(pageSize*(page-1));

    res.status(200).json({all_applications,page,pages: Math.ceil(count/pageSize)});
})




/* 
    @description This route gives all applications in database submitted by requested founder
    @method Get
    @route /api/applications/creator/:id
*/

exports.getApplicationsByCreatorId = asyncHandler(async (req, res) => {
    try {
      applications24hrchecker();
      console.log(req.params.id);
      const user = await User_Model.findById(req.params.id);
      if (!user) {res.status(400).json({error:"User for which applications are requested does not exist"}); return;}

      const pageSize = 4
      const page = Number(req.query.pageNumber) || 1 
      const count = await Application_Model.count({ creator: req.params.id })
  
      const applications = await Application_Model
        .find({ creator: req.params.id })
        .sort({createdAt: -1})
        .limit(pageSize)
        .skip(pageSize*(page-1));

      res.status(200).json({applications,page,pages: Math.ceil(count/pageSize)});
    } 
    catch (err) {
      res.status(400).json({error: "Server Error"});
    }
});
  



/* 
    @description This route gives all applications in database for requested incubator
    @method Get
    @route /api/applications/incubator
*/


exports.getApplicationsByIncubatorId = asyncHandler(async(req,res)=>{
    try{
        applications24hrchecker();

        const incubator = await Incubator_Model
        .findOne({"email": req.user.email})


            const pageSize = 4
            const page = Number(req.query.pageNumber) || 1 
            const count = await Incubator_Model.count({assigned_incubator: incubator})
            const applications = await Application_Model
            .find({assigned_incubator: incubator})
            .populate('assigned_incubator')
            .sort({createdAt: -1})
            .limit(pageSize)
            .skip(pageSize*(page-1));

            res.status(200).json({applications,page,pages: Math.ceil(count/pageSize)});
            // console.log(applications);
        
        
    }
    catch(err){
        res.status(400).json({error: "Server Error"});
    }
})

  



/* 
    @description This route gives application details in database
    @method Post
    @route /api/applications/details
*/

exports.getApplicationDetailsById = asyncHandler(async(req,res)=>{
    try {
        const application = await Application_Model.findOne({ _id: req.body.appln_id })
        res.status(200).json(application);
    } 
    catch (err) {
        return res.status(400).json({message: "This application does not exist"});
    }
})




/* 
    @description This route create the application with fiven details in database
    @method Post
    @route /api/applications/create
*/

exports.createApplication = asyncHandler(async (req, res) => {

    const application = new Application_Model({
        name: req.body.name,
        email: req.body.email,
        startup_name: req.body.startup_name,
        linkedin_profile: req.body.linkedin_profile,
        college_name: req.body.college_name,
        contact_number: req.body.contact_number,
        startup_stage: req.body.start_up_stage,
        startup_problem: req.body.start_up_problem,
        startup_differentiator: req.body.start_up_differentiator,
        creator: req.user._id,
    });
  
    try {
        await application.save();
        applications24hrchecker()
        res.status(200).json({message: "Application succesfully created"});
        assignApplication();
    } 

    catch (err) {
        res.status(400).json({error: "Error in creating application"});
    }
})
  





// exports.acceptApplication = asyncHandler(async(req,res)=>{

//     try {
//         await Application_Model.updateOne(
//             { _id: req.params.id },
//             { $set: { curr_status: "Accepted" } }
//         );
    
//         let appln_id = req.params.id;
        
//         await Incubator_Model.updateOne(
//             { email: req.body.email },
//             { $push: { applications_accepted: { application_id: appln_id, reason: req.body.reason } }}
//         )
    
    
//         await Incubator_Model.updateOne(
//             {email: req.body.email},
//             { $pull: { "applications_submitted":  { "application_id": appln_id  }}}
//         );
        
//         res.status(200).json({message: "Application accepted"})

//     } 
    
//     catch (error) {
//         res.status(400).json({error: "Error in accepting application"});
//     }

// })






// exports.rejectApplication = asyncHandler(async(req,res)=>{

//     try {

//         await Application_Model.updateOne(
//             { _id: req.params.id },
//             { $set: { assigned_incubator: null } }
//         );
        
        
//         let appln_id = req.params.id;
        
//         await Incubator_Model.updateOne(
//             {email: req.body.email},
//             { $push: { applications_rejected: { application_id: appln_id, reason: req.body.reason}}}
//         )
        
        
//         await Incubator_Model.updateOne(
//             {email: req.body.email},
//             { $pull: { "applications_submitted": { "application_id": appln_id} } }
//         );
        
//         assignApplication();
    
//         res.status(200).json({message: "Application rejected"})
//     } 
    
//     catch (error) {
//         res.status(400).json({error: "Error in rejecting application"});
//     }

  
// })







exports.acceptApplication = asyncHandler(async(req,res)=>{
    console.log('this is running');
    
    await Application_Model.updateOne({ _id: req.params.id },
      { $set: { curr_status: "Accepted" } }
    );
  
    let appln_id = req.params.id;

    await Incubator_Model.updateOne(
        { email: req.body.email },
        { $push: { 
          applications_accepted: 
          {
            application_id: appln_id,
            reason: req.body.reason
          }
        }
      }
      )
  
  

    await Incubator_Model.updateOne({email: req.body.email},
      { $pull: {
        "applications_submitted":  { 
          "application_id": appln_id,
        }
      } 
    });
    

    res.send("Application accepted")
})
  
  
  
exports.rejectApplication = asyncHandler(async(req,res)=>{

    await Application_Model
    .updateOne(
        { _id: req.params.id }, 
        { $set: { assigned_incubator: null } }
    );

    
    let appln_id = req.params.id;
   
    await Incubator_Model.updateOne(
        { email: req.body.email },
        { $push: { applications_rejected: { application_id: appln_id, reason: req.body.reason}}}
    )

    console.log(req.body.email)


    // Incubator_Model.findOne({email:req.body.email}).then((res)=>console.log(res))


      await Incubator_Model.updateOne({email: req.body.email},
        { $pull: {
          "applications_submitted": { 
            "application_id": appln_id,
          }
        } 
      });

     
    // const i = await Incubator_Model.findOne({email:req.body.email})
    // console.log(i);
  
    const applications = await Application_Model.find();
    const incubators = await Incubator_Model.find();
        
    for (let i = 0; i < applications.length; i++) 
        if (applications[i].assigned_incubator === null ) {
            console.log(applications[i]);
            let currentIncubator = incubators[0];
            let currApplications =1000;

            for(let j=0;j<incubators.length;j++){
                let check =  await not_have_appln(incubators[j]._id,applications[i]._id,incubators);
                console.log(incubators[j].name," ke paas check hai ",check);
                let appln_now = incubators[j].applications_submitted.length;
                if(appln_now<=currApplications && check){ 
                    currApplications = incubators[j].applications_submitted.length;
                    currentIncubator = incubators[j];
                }
            }

            const b= await not_have_appln(currentIncubator._id,applications[i]._id,incubators);


            console.log("Finally", b)
  
            if(!b){
                await Application_Model.updateOne(
                    { _id: applications[i]._id },
                    { $set: { curr_status: "Rejected" } }
                );
                return;
            }

            else{
                await Application_Model.updateOne({ _id: applications[i]._id },
                    { $set: { assigned_incubator: currentIncubator._id } }
                );
        
                
                await Incubator_Model.updateOne(
                    {_id:currentIncubator._id},
                    { $push: { applications_submitted:  {  application_id: applications[i]._id,  timestamp: new Date() }}}
                );

                const ity = await Incubator_Model.findOne({_id:currentIncubator._id});
                console.log(ity);
                
            }
  
          }
      
      
 



  
    res.send("Application rejected")
  })
  
  
  