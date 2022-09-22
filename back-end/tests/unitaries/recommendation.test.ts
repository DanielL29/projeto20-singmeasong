import { prisma } from '../../src/database'
import { recommendationService } from '../../src/services/recommendationsService'
import { recommendationRepository } from '../../src/repositories/recommendationRepository'
import * as recommendationFactory from '../factories/recommendationFactory'
import { conflictError } from '../../src/utils/errorUtils'

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`
})

describe('POST /recommendations', () => {
    it('expect to name to be not found and create recommendation', async () => {
        const recommendation = recommendationFactory.createRecommendation()

        jest.spyOn(recommendationRepository, 'findByName').mockResolvedValueOnce(null)
        jest.spyOn(recommendationRepository, 'create').mockResolvedValueOnce()

        await expect(recommendationService.insert(recommendation)).resolves.not.toThrow()

        expect(recommendationRepository.findByName).toHaveBeenCalledWith(recommendation.name)
        expect(recommendationRepository.create).toHaveBeenCalled()
    })

    it('expect to name to be found and dont create recommendation', async () => {
        const recommendation = await recommendationFactory.insertRecommendation()

        jest.spyOn(recommendationRepository, 'findByName').mockResolvedValueOnce(recommendation)

        await expect(recommendationService.insert({
            name: recommendation.name,
            youtubeLink: recommendation.youtubeLink
        })).rejects.toEqual(conflictError('Recommendations names must be unique'))

        expect(recommendationRepository.findByName).toHaveBeenCalledWith(recommendation.name)
    })
})

describe('POST /recommendations/:id/upvote', () => {
    it('given a found id, return 200', async () => {

    })

    it('given a not found id, return 404', async () => {

    })
})

describe('POST /recommendations/:id/downvote', () => {
    it('given a found id, return 200', async () => {

    })

    it('given a not found id, return 404', async () => {

    })

    it('given a downvote less than -5 delete a recommendation, return 404', async () => {

    })
})

describe('GET /recommendations', () => {
    it('given an array of recommendations, return 200', async () => {

    })
})

describe('GET /recommendations/:id', () => {
    it('given a correct recommendation object on get, return 200', async () => {

    })

    it('given a not found id, return 404', async () => {

    })
})

describe('GET /recommendations/random', () => {
    it('given a correct random recommendation object, return 200', async () => {

    })

    it('given a get and not found any recommendation on db, return 404', async () => {

    })
})

describe('GET /recommendations/top/:amount', () => {
    it('given a array of objects ordered by score passing amount, return 200', async () => {

    })
})


afterAll(async () => {
    await prisma.$disconnect()
})
