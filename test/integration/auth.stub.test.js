process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();

const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const sinon = require('sinon');
const server = require('../../server');
const knex = require('../../database/connections');

describe.only('routes : auth - stubbed', () => {
    beforeEach(() => {
        this.authenticate = sinon.stub(passport, 'authenticate').returns(() => {});
    });

    afterEach(() => {
        this.authenticate.restore();
    });
    describe.only('POST /auth/register', () => {
        beforeEach(() => {
            const user = [
            {
                id: 1,
                username: 'michael',
                password: 'something'
            }
            ];
            this.query = sinon.stub(queries, 'addUser').resolves(user);
        });
        afterEach(() => {
            this.query.restore();
        });
        it('should register a new user', (done) => {
            chai.request(server)
            .post('/auth/register')
            .send({
            username: 'michael',
            password: 'herman'
            })
            .end((err, res) => {
                res.redirects[0].should.contain('/auth/status');
                done();
            });
        });
    });

});