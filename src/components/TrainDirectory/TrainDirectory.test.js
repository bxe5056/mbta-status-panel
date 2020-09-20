const TrainDirectory = require('./TrainDirectory');

describe('getTrainsForDay()', () => {
    describe('Using core/default TrainList',() => {
        test('Monday Trains are not null', () => {
            expect(JSON.stringify(TrainDirectory.getTrainsForDay('MONDAY'))).toContain("MONDAY");
            expect(JSON.stringify(TrainDirectory.getTrainsForDay('MONDAY'))).not.toContain("SUNDAY");

        });
        test('Weekend Trains are not null', () => {
            expect(JSON.stringify(TrainDirectory.getTrainsForDay('SUNDAY'))).toContain("SUNDAY");
            expect(JSON.stringify(TrainDirectory.getTrainsForDay('SUNDAY'))).not.toContain("MONDAY");
        });
    })
    describe('Using modified TrainList',() => {
        let modifiedTrainList = {
            1000 :{ direction: 'outbound', time:{ 'Franklin': '00:01', 'Back Bay': '00:02'}, bikes: 1, days: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'] },
            1001 :{ direction: 'outbound', time:{ 'Franklin': '00:03', 'Back Bay': '00:04'}, bikes: 1, days: ['SATURDAY'] },
        }
        test('Monday Trains are not null', () => {
            expect(JSON.stringify(TrainDirectory.getTrainsForDay('MONDAY',modifiedTrainList))).toContain("1000");
            expect(JSON.stringify(TrainDirectory.getTrainsForDay('MONDAY',modifiedTrainList))).not.toContain("1001");
        });
        test('Weekend Trains are not null', () => {
            expect(JSON.stringify(TrainDirectory.getTrainsForDay('SATURDAY',modifiedTrainList))).toContain("1001");
            expect(JSON.stringify(TrainDirectory.getTrainsForDay('SATURDAY',modifiedTrainList))).not.toContain("1000");
        });
    })
})

describe('getTrainsForDirection()', () => {
    describe('Using core/default TrainList', () => {
        test('Inbound Trains are not null', () => {
            expect(JSON.stringify(TrainDirectory.getTrainsForDirection('INBOUND')).toLowerCase()).toContain("INBOUND".toLowerCase());
            expect(JSON.stringify(TrainDirectory.getTrainsForDirection('INBOUND')).toLowerCase()).not.toContain("OUTBOUND".toLowerCase());

        });
        test('Outbound Trains are not null', () => {
            expect(JSON.stringify(TrainDirectory.getTrainsForDirection('OUTBOUND')).toLowerCase()).toContain("OUTBOUND".toLowerCase());
            expect(JSON.stringify(TrainDirectory.getTrainsForDirection('OUTBOUND')).toLowerCase()).not.toContain("INBOUND".toLowerCase());
        });
    })
    describe('Using modified TrainList', () => {
        let modifiedTrainList = {
            9999: {direction: 'outbound', time: {'Franklin': '24:27', 'Back Bay': '23:35'}, bikes: 1, days: ['SATURDAY']},
            9998: {direction: 'inbound', time: {'Franklin': '06:47', 'Back Bay': '07:38'}, bikes: 1, days: ['SATURDAY']}
        }
        test('Inbound Trains are not null', () => {
            expect(JSON.stringify(TrainDirectory.getTrainsForDirection('INBOUND', modifiedTrainList)).toLowerCase()).toContain("9998".toLowerCase());
            expect(JSON.stringify(TrainDirectory.getTrainsForDirection('INBOUND', modifiedTrainList)).toLowerCase()).not.toContain("OUTBOUND".toLowerCase());
        });
        test('Outbound Trains are not null', () => {
            expect(JSON.stringify(TrainDirectory.getTrainsForDirection('OUTBOUND', modifiedTrainList)).toLowerCase()).toContain("9999".toLowerCase());
            expect(JSON.stringify(TrainDirectory.getTrainsForDirection('OUTBOUND', modifiedTrainList)).toLowerCase()).not.toContain("INBOUND".toLowerCase());
        });
    })
})

describe('getUpcomingTrains()', () => {
    test('Monday Trains are not null', () => {
        expect(JSON.stringify(TrainDirectory.getNextTrain('SATURDAY', 'inbound', '12:01', 'Franklin'))).toContain("1708");
    });
})