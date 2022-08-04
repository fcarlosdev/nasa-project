const request = require('supertest');
const app = require('../../app');

describe('Test GET /v1/launches',() => {
  test('It should respond with 200 success', async () => {
    await request(app)
      .get('/v1/launches')
      .expect('Content-Type',/json/)
      .expect(200)
  })
});

describe("Test POST /v1/launch", () => {
  const completeLaunchData = {
    mission: 'Explore new worlds',
    rocket: 'NNC 188-F',
    target: "Kepler-186",
    launchDate: "January 4, 2030"
  };

  const launchDataWhitoutDate = {
    mission: 'Explore new worlds',
    rocket: 'NNC 188-F',
    target: "Kepler-186",
  };

  const launchDataWithInvalidDate = {
    mission: 'Explore new worlds',
    rocket: 'NNC 188-F',
    target: "Kepler-186",
    launchDate: "something"
  };

  test("It should respond with 201 success", async () => {
    const response = await request(app)
      .post("/v1/launches")
      .send(completeLaunchData)
      .expect('Content-Type',/json/)
      .expect(201);

    const requestDate  = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchDataWhitoutDate);
      
  });

  test("It should catch missing required properties",async () => {
    const response = await request(app)
      .post('/v1/launches')
      .send(launchDataWhitoutDate)
      .expect('Content-Type',/json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Missing required launch property'
    })
  });

  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post('/v1/launches')
      .send(launchDataWithInvalidDate)
      .expect('Content-Type',/json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Invalid launch date'
    })

  });

})
