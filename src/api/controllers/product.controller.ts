import { Response, Post, Request, Route, Res, TsoaResponse, Tags, FormField, UploadedFile, UploadedFiles, Body, Delete, Get, Patch, Path } from "tsoa";
import express from "express";
import fileHandler from "../utils/file-handler";
import { handleErrorResponse } from '../utils/response-handler';
import ProductService from "../services/product.service";
import decodeTokenMiddleware from "../middlewares/auth";

@Route("peoducts")
@Tags("Products")
export class ProductController {

  @Response(201, 'Registered successfully')
  // email already in use
  @Response(409, 'email already in use')
  @Post("create")
  public async uploadAnyMultiple(
    // @UploadedFiles() image: Express.Multer.File[],
    @Res() sendSuccess: TsoaResponse<201, { resp: { success: true, data: any } }>,
    @Res() sendError: TsoaResponse<400, { resp: { success: false, status: number, message: object } }>,
    @Request() request: express.Request,
    @FormField() title?: string,
    @FormField() price?: number,
    @FormField() description?: string,
    @FormField() short_description?: string,
    @FormField() brand?: string,
    @FormField() quantity?: number,
    @FormField() category?: string,
    @FormField() tags?: string[],
    @FormField() discount?: number,
  ) {
    try {
      // decode token
      await decodeTokenMiddleware(request);
      // if the user is not an admin, return an error
      //@ts-ignore
      if (!request.decodedUser.isAdmin) {
        sendError(400, { resp: { success: false, status: 400, message: { message: 'you are not authorized to perform this action' } } })
      }
      await new fileHandler(request, request.res, { fieldName: 'images', maxSize: 5, encType: 'image' }).uploadFile(request);
      // check for our custom multer error attached to the requst on file upload failure
      //@ts-ignore
      if (request.multerError) {
        //@ts-ignore
        sendError(400, { resp: { success: false, status: 400, message: request.multerError } })
      }
      
      // create a new product
      if (!title || !price || !quantity) {
        sendError(400, { resp: { success: false, status: 400, message: { message: 'title, price and quantity are required' } } })
      }
      //@ts-ignore
      const product = await ProductService.create({
        title,
        description,
        short_description,
        brand,
        quantity,
        category,
        tags,
        discount,
        //@ts-ignore
        price,
        //@ts-ignore
        images: request.files.map((file: any) => request.files.map((file: any) => file.filename+'.'+file.originalname.split('.').pop())),
        //@ts-ignore
        uploaded_by: request.decodedUser.userId
      });
      sendSuccess(201, { resp: { success: true, data: product } })
    } catch (err: any) {
      //@ts-ignore
      return handleErrorResponse(sendError, request.multerError || err);
    }
  }

  @Response(200, 'Product updated successfully')
  @Response(400, 'Bad request')
  @Response(401, 'Not allowed')
  @Patch("update")
  public async update(
    @Res() sendSuccess: TsoaResponse<200, { resp: { success: true, data: any } }>,
    @Res() sendError: TsoaResponse<400, { resp: { success: false, status: number, message: object } }>,
    // @UploadedFiles() image: Express.Multer.File[],
    @Request() request: express.Request,
    @FormField() title?: string,
    @FormField() description?: string,
    @FormField() short_description?: string,
    @FormField() price?: string,
    @FormField() brand?: string,
    @FormField() quantity?: number,
    @FormField() category?: string,
    @FormField() tags?: string[],
    @FormField() discount?: string[],
  ) {
    try {
      // decode token
      await decodeTokenMiddleware(request);
      // if the user is not an admin, return an error
      //@ts-ignore
      if (!request.decodedUser.isAdmin) {
        sendError(400, { resp: { success: false, status: 400, message: { message: 'you are not authorized to perform this action' } } })
      }
      await new fileHandler(request, request.res, { fieldName: 'images', maxSize: 5, encType: 'image' }).uploadFile(request);
      // check for our custom multer error attached to the requst on file upload failure
      //@ts-ignore
      if (request.multerError) {
        //@ts-ignore
        sendError(400, { resp: { success: false, status: 400, message: request.multerError } })
      }
      
      // create a new product
      const update = {
        title,
        description,
        short_description,
        brand,
        quantity,
        category,
        tags,
        discount,
        price,
        //@ts-ignore
        uploaded_by: request.decodedUser.userId
      }
      //@ts-ignore
      request.files?.length && (update.images = request.files.map((file: any) => file.filename+'.'+file.originalname.split('.').pop()))
      const product = await ProductService.create
      sendSuccess(200, { resp: { success: true, data: product } })
    } catch (err: any) {
      //@ts-ignore
      return handleErrorResponse(sendError, request.multerError || err);
    }
  }

  @Response(200, 'Product deleted successfully')
  @Response(400, 'Bad request')
  @Response(401, 'Not allowed')
  @Delete("delete")
  public async deleteProduct(
    @Res() sendError: TsoaResponse<400, { resp: { success: false, status: number, message: object } }>,
    @Res() sendSuccess: TsoaResponse<200, { resp: { success: true, data: any } }>,
    @Request() request: express.Request,
    @Body() body: { productId: string }
  ) {
    try {
      // decode token
      await decodeTokenMiddleware(request);
      // if the user is not an admin, return an error
      //@ts-ignore
      if (!request.decodedUser.isAdmin) {
        sendError(400, { resp: { success: false, status: 400, message: { message: 'you are not authorized to perform this action' } } })
      }
      const product = await ProductService.delete(body.productId);
      sendSuccess(200, { resp: { success: true, data: product } })
    } catch (err: any) {
      //@ts-ignore
      return handleErrorResponse(sendError, request.multerError || err);
    }
  }

  @Get("get-producst")
  @Response(200, 'Products fetched successfully')
  @Response(404, 'Products not found')
  public async getProducts(
    @Res() sendSuccess: TsoaResponse<200, { resp: { success: true, data: any } }>,
    @Res() sendError: TsoaResponse<400, { resp: { success: false, status: number, message: object } }>,
    @Request() request: express.Request,
  ) {
    try {
      const products = await ProductService.getAll();
      return sendSuccess(200, { resp: { success: true, data: products } });
    } catch (err: any) {
      //@ts-ignore
      return handleErrorResponse(sendResponse, request.multerError || err);
    }
  }

  @Get("get/:id")
  @Response(200, 'Product fetched successfully')
  @Response(400, 'Bad request')
  @Response(404, 'Product not found')
  public async getProduct(
    @Res() sendSuccess: TsoaResponse<200, { resp: { success: true, data: any } }>,
    @Res() sendError: TsoaResponse<400, { resp: { success: false, status: number, message: object } }>,
    @Request() request: express.Request,
    @Path() id: string
  ) {
    try {
      const product = await ProductService.get(id);
      sendSuccess(200, { resp: { success: true, data: product } })
    } catch (err: any) {
      //@ts-ignore
      return handleErrorResponse(sendError, request.multerError || err);
    }
  }
}

export default new ProductController();