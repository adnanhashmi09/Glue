const router = require('express').Router()
const { getHistory, getNetwork, updateNetwork, initNetwork, filterHistory, getNodes, newData } = require('../controllers/elastic')

router.post('/new', newData) 
router.get('/history/:network', getHistory); 
router.post('/history/filter', filterHistory)  
router.get('/network/:node', getNetwork); 
router.post('/network/nodes', getNodes); 
router.post('/network/update', updateNetwork); 
router.get('/network/init/:node', initNetwork); 

module.exports = router;