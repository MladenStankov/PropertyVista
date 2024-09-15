import { Body, Controller, Delete, Get, Patch, Path, Post, Request, Route, Security, Tags } from "tsoa";
import { IListing } from "../interfaces/listing.interface";
import Listing from "../database/models/listing.model";
import StatusCode from "status-code-enum";
import { HttpError } from "../errors/errors";
import { IExpressRequest } from "../interfaces/express.interface";
import { list } from "@sequelize/core/_non-semver-use-at-your-own-risk_/expression-builders/list.js";

@Route('listing')
@Tags('Listing')
export class ListingController extends Controller {
    @Get('/all')
    public async getAll() : Promise<IListing[]> {
        const listings = await Listing.findAll()

        this.setStatus(StatusCode.SuccessOK)
        return listings
    }

    @Get('/{id}')
    public async getById(
        @Path() id: number
    ) : Promise<IListing> {
        const listing = await Listing.findByPk(id)

        if(!listing) {
            throw new HttpError(StatusCode.ClientErrorNotFound, 'Listing not found')
        }

        this.setStatus(StatusCode.SuccessOK)
        return listing
    }

    @Post('')
    @Security('jwt', ['broker'])
    public async create(
        @Body() requestBody: IListing,
        @Request() req: IExpressRequest
    ) : Promise<IListing> {
        const brokerId = req.userId
        const listingPayload = {...requestBody, brokerId}

        const newListing = await Listing.create(listingPayload)
        await newListing.save()

        this.setStatus(StatusCode.SuccessCreated)
        return newListing
    }

    // @Patch('/{id}')
    // @Security('jwt', ['broker'])
    // public async patch(
    //     @Body() requestBody: IPatchPayload,
    //     @Patch() id: number,
    //     @Request() req: IExpressRequest
    // ) : Promise<IListing> {
    //     const brokerId = req.userId
    //     const listing = await Listing.findByPk(id)

    //     if(!listing) {
    //         throw new HttpError(StatusCode.ClientErrorNotFound, 'Listing not found.')
    //     }

    //     if(listing.brokerId !== brokerId) {
    //         throw new HttpError(StatusCode.ClientErrorUnauthorized, 'Unauthorized user.')
    //     }

    //     //TODO: make the propertdata structure into different models and assossiate them in the db

    //     this.setStatus(StatusCode.SuccessOK)
    //     return listing
    // }

    @Delete('/{id}')
    @Security('jwt', ['broker'])
    public async delete(
        @Patch() id: number,
        @Request() req: IExpressRequest
    ) : Promise<void> {
        const brokerId = req.userId
        const listing = await Listing.findByPk(id)

        if(!listing) {
            throw new HttpError(StatusCode.ClientErrorNotFound, 'Listing not found.')
        }

        if(listing.brokerId !== brokerId) {
            throw new HttpError(StatusCode.ClientErrorUnauthorized, 'Unauthorized user.')
        }

        await listing.destroy()
        await listing.save()

        this.setStatus(StatusCode.SuccessOK)
        return
    }
}