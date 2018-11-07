'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');
chai.use(chaiThings);
//Review
const {Review} = require('../../server/db/models');

//Review Routes
const app = require('../');
const agent = require('supertest')(app);

  describe('Review model', () => {
    describe('Validations', () => {
      it('requires text', async () => {
        const review = Review.build();

        try {
          await review.validate()
          throw Error('validation failed to throw an error for not containing text');
        }
        catch (err) {
          expect(err.message).to.contain(' review text cannot be null');
        }
      });
    })
  })



  describe('Review routes', () => {
    let reviews;

    const reviewData = [
      {
        rating: 0,
        title: "Awful , Yuckkkk!",
        review: "This Cheese made me sick to my stomach.",
        productId: 1

      },
      {
        rating: 4,
        title: "This cheese was so tasty",
        review: "I will be buying this cheese and eating it so much that I will turn into a cheese",
        productId: 1
      }
    ];

    beforeEach(async () => {
      const createdReviews = await Review.bulkCreate(reviewData)
      reviews = createdReviews.map(review => review.dataValues);
    });

    // Route for fetching all reviews
    describe('GET `/api/reviews/:productId`', () => {
      it('fetched all Reviews for a given review', async () => {
        const response = await agent
          .get('/api/reviews/2')
          .expect(200);
        expect(response.body).to.have.length(2);
        expect(response.body[0].title).to.equal(reviews[0].title);
      });
    });

  });


