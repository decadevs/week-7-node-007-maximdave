// import request from 'supertest';
// import router from '../routes/index';


// interface DefaultData{
//     id?: number,
//     shape: string,
//     dimension: {
//       length : number,
//       height : number,
//       breadth?: number
//     }|number,
//     area?: string,
//     dateCreated?: Date
//   }

// let user: DefaultData = {
//     id: 1,
//     shape: 'square',
//     dimension:{length: 1, height:2}
// }
// let id = ''
// describe('Post', () => {
//     it('should create a post', async () => {
//         const response = await request(router).post('/calculate').send(user);
//         expect(response.status).toBe(201);
//         expect(response.body).toHaveProperty('data')
//         expect(response.body).toHaveProperty('status')
//         expect(response.body.status).toBe('success')
//     });
// });
// describe('GET', () => {
//     it('should get all users', async () => {
//         const response = await request(router).get('/fetchRecords')
//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty('data')
//         expect(response.body).toHaveProperty('status')
//         expect(response.body.status).toBe('success')
//     });
//     it('should get one users', async () => {
//         const response = await request(router).get(`/fetchRecords/${id}`)
//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty('data')
//         expect(response.body).toHaveProperty('status')
//         expect(response.body.status).toBe('success')
//     });
// })