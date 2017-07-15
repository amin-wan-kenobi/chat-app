const expect = require('expect');
var { Users } = require('./Users');

describe('Users', () => {

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: 1,
                name: 'Mike',
                room: 'Node Course'
            }, {
                id: 2,
                name: 'Adam',
                room: 'React Course'
            }, {
                id: 3,
                name: 'Julie',
                room: 'Node Course'
            }
        ]
    });

    it('should add new user', () => {
        var users = new Users();

        var user = {
            id: '123',
            name: 'Amin',
            room: 'Node JS fans'
        };

        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return names for Node Course', () => {
        var userList = users.getUserList('Node Course');
        
        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for React Course', () => {
        var userList = users.getUserList('React Course');
        
        expect(userList).toEqual(['Adam']);
    });

    it('should remove a user', () => {
        var userId = 1;
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var userId = 100;
        var user = users.removeUser(userId);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = 1;
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        var userId = 100;
        var user = users.getUser(userId);
        expect(user).toNotExist();
    });

    
});
