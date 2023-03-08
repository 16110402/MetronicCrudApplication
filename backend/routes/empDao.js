const Media = require('../models/Media');
const jwt = require("jsonwebtoken");
const { logger } = require('../../../lib/Logger');
const outputLogger = require('../../../lib/OutputLogger');
const bcrypt = require('bcryptjs');
const uniqid = require('uniqid');

const LoggerOutput = new outputLogger();
class mediaDao {

    async insertmedia(orgId, fileName, type, refSvc, link, initiatedBy) {
        try {
            if(orgId && fileName && type && refSvc) 
            {
                let mediadata = await Media.create({
                            orgId: orgId,
                            type: type,
                            fileName: fileName,
                            refSvc: refSvc,
                            link: link,
                            initiatedBy: initiatedBy,
                  });
                return mediadata;
            }
            else 
                throw "Please fill all details";
        } catch (error) {
            logger.log({
                level: 'error',
                message: `Getting Error - Insert media Api`,
                error: error,
            });
            console.log(error);
            throw "Failed to insert media!";
        }
    }

async updatesymptom(id) {
        try {
            let media = Media.findOne({"_id": id})
            return media;          
        } catch (error) {
            logger.log({
                level: 'error',
                message: `Getting Error - Update Symptom Api`,
                error: error,
            });
            console.log(error);
            throw "Failed to update symptom!";
        }
    }

async markStatus(id) {
        try {
            let media = Media.findOne({"_id": id})
            return media;          
        } catch (error) {
            logger.log({
                level: 'error',
                message: `Getting Error - Update Symptom Api`,
                error: error,
            });
            console.log(error);
            throw "Failed to update symptom!";
        }
    }


}

exports.mediaDao = new mediaDao();