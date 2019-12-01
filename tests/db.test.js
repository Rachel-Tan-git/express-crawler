const DatabaseUtility = require('../utility/db');

var EventEmitter = require('events').EventEmitter; 
var event = new EventEmitter(); 
var db = new DatabaseUtility();
var priMap={};
var levelMap={};

event.on('DB data prepared', function() { 
        process.exit();
}); 

(async ()=>{
    console.log('我正在读取数据库，准备需要的数据');
    
    var admissionLevelPromise = db.getPromiseOfAdmissionLevel();
    await db.handleGetPromiseOfAdmissionLevel(admissionLevelPromise);    
    var provincesPromise = db.getPromiseOfProvinces();
    await db.handleGetPromiseOfProvinces(provincesPromise);
    priMap=db.provincesMap;
    levelMap=db.admissionLevelMap;
    event.emit('DB data prepared'); 
})();

/*test('mysql select prepare', () => {
    expect(DB.prepare()).toBe('SELECT `*` FROM `users`');
    expect(DB.prepare(['id', 'name'], 'level', 100)).toBe('SELECT `id`, `name` FROM `level` WHERE `id` = 100');
});

test('mysql select test', (done) => {
    expect.assertions(1);
    return db.query('select 1+1').then(function(result) {
        expect(result[0]['1+1'] == 2).toEqual(true);
        done();
    }).catch((err) => setImmediate(() => { throw err }));
});

//step3: databae operations. Test whether a specific record is in table.
test('should throw an error if result is not 2 [ASYNC/AWAIT]', async (done) => {
    try {
        var test = await db.asyncQuery('select 1+1');
        expect(typeof test).toBe('object');
        expect(test[0]['1+1']).toBe(2);
        done();
    } catch (error) {
        expect(error.message).toBe('User with id: 11 was not found.');
    }
});

// a demo for Lauren
test('should get the admission level map', async (done) => {
    try {
        var admissionLevelPromise = db.getPromiseOfAdmissionLevel();
        await db.handleGetPromiseOfAdmissionLevel(admissionLevelPromise);
        console.log(db.admissionLevelMap);
        expect(db.admissionLevelMap['自主招生线']).toBe(2);
        expect(db.admissionLevelMap['三批']).toBe(11);
        expect(db.admissionLevelMap['第三批']).toBe(60);
        expect(db.admissionLevelMap['二批B']).toBe(89);
        expect(db.admissionLevelMap['牛奶']).toBe(undefined);
        done();
    } catch (error) {
        console.error(error.message);
    }
});
*/

afterAll(() => {
    db.dbClose();
});
