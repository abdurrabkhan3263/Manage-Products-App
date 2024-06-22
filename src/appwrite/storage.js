import conf from "../config/config";
import { Client, Databases, Storage, ID, Query } from "appwrite";

class DatabaseService {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
  }

  async createCustomer({
    customerName,
    phoneNumber,
    customerAddress,
    totalUdhar,
    customerHistory,
    customerLatest,
    listPdf,
    belongsTo,
    customerImageId,
    customerImage,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabase,
        conf.appWriteCustomerDetailsCollId,
        ID.unique(),
        {
          customerName,
          phoneNumber,
          customerAddress,
          totalUdhar,
          customerHistory,
          customerLatest,
          listPdf,
          belongsTo,
          customerImageId,
          customerImage,
        },
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Create Customer :: ", error);
    }
  }

  async updateCustomer(
    slug,
    {
      customerName,
      phoneNumber,
      customerAddress,
      totalUdhar,
      customerHistory,
      customerLatest,
      listPdf,
      customerImageId,
      customerImage,
    },
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabase,
        conf.appWriteCustomerDetailsCollId,
        slug,
        {
          customerName,
          phoneNumber,
          customerAddress,
          totalUdhar,
          customerHistory,
          customerLatest,
          listPdf,
          customerImageId,
          customerImage,
        },
      );
    } catch (error) {
      throw ("AppWrite :: Error :: UpdateCustomer :: ", error);
    }
  }

  async deleteCustomer(userId) {
    try {
      return await this.databases.deleteDocument(
        conf.appWriteDatabase,
        conf.appWriteCustomerDetailsCollId,
        userId,
      );
    } catch (error) {
      throw ("AppWrite :: Error :: deleteCustomer :: ", error);
    }
  }

  async gettingAllCustomer(Query = []) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabase,
        conf.appWriteCustomerDetailsCollId,
        Query && Query,
      );
    } catch (error) {
      throw ("AppWrite :: Error :: gettingAllCustomer :: ", error);
    }
  }

  async gettingCustomerById(slug) {
    try {
      return await this.databases.getDocument(
        conf.appWriteDatabase,
        conf.appWriteCustomerDetailsCollId,
        slug,
      );
    } catch (error) {
      throw new Error("AppWrite :: Error :: gettingCustomerById :: ", error);
    }
  }

  async createCustomerBuyHistory({ userId, customerDetails, productList }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabase,
        conf.appWriteBuyHistory,
        ID.unique(),
        { userId, customerDetails, productList },
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Create Customer Buy History :: ", error);
    }
  }

  async deleteCustomerBuyHistory(customerId) {
    try {
      return await this.databases.deleteDocument(customerId);
    } catch (error) {
      throw ("AppWrite :: Error :: Delete Customer Buy History :: ", error);
    }
  }

  async getCustomerBySearch(belongsTo, name) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabase,
        conf.appWriteCustomerDetailsCollId,
        [
          Query.equal("belongsTo", belongsTo),
          Query.search("customerName", name),
        ],
      );
    } catch (error) {
      throw ("AppWrite :: Error Get Customer By Search :: Error ", error);
    }
  }

  async createGraphData({ userId, productNamePrice, buyDate }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabase,
        conf.createGraphData,
        { userId, productNamePrice, buyDate },
      );
    } catch (error) {
      throw ("AppWrite :: Error :: CreateGraph Data :: ", error);
    }
  }

  async allGraphData(userId) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabase,
        conf.appWriteGraphData,
        [Query.equal("userId", userId)],
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Getting All Graph Data :: ", error);
    }
  }

  async getProductList(Query = []) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabase,
        conf.appWriteProductsListCollId,
        Query,
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Getting ProductData :: ", error);
    }
  }

  async createProductDetails({
    productName,
    productPrice,
    productImage,
    productPriceOption,
    productImageId,
    userId,
    isOption,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabase,
        conf.appWriteProductsListCollId,
        ID.unique(),
        {
          productName,
          productPrice,
          productImage,
          productPriceOption,
          productImageId,
          userId,
          isOption,
        },
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Create Product Details :: ", error);
    }
  }

  async updateProductDetails(
    slug,
    {
      productName,
      productPrice,
      productImage,
      productPriceOption,
      productImageId,
      userId,
      isOption,
    },
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabase,
        conf.appWriteProductsListCollId,
        slug,
        {
          productName,
          productPrice,
          productImage,
          productPriceOption,
          productImageId,
          userId,
          isOption,
        },
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Update Product Details :: ", error);
    }
  }

  async deleteProduct(slug) {
    try {
      return await this.databases.deleteDocument(
        conf.appWriteDatabase,
        conf.appWriteProductsListCollId,
        slug,
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Delete Product List :: ", error);
    }
  }

  async getProductById(id) {
    try {
      return await this.databases.getDocument(
        conf.appWriteDatabase,
        conf.appWriteProductsListCollId,
        id,
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Get Product Id :: ", error);
    }
  }

  async createSell({ customerDetails, productList, buyDate, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabase,
        conf.appWriteCreateSell,
        ID.unique(),
        { customerDetails, buyDate, productList, userId },
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Create Sell :: ", error);
    }
  }

  async updateSell(slug, { customerDetails, productList, buyDate }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabase,
        conf.appWriteCreateSell,
        slug,
        { customerDetails, productList, buyDate },
      );
    } catch (error) {
      throw ("AppWrite :: Error :: UpdateSell :: ", error);
    }
  }

  async getInvoice(belongsTo, offsetNumber) {
    try {
      let invoiceData = await this.databases.listDocuments(
        conf.appWriteDatabase,
        conf.appWriteCreateSell,
        [
          Query.equal("userId", belongsTo),
          Query.limit(10),
          Query.offset(offsetNumber || 0),
        ],
      );
      invoiceData = invoiceData?.documents;
      const newArr = await Promise.all(
        invoiceData.map(async (data) => {
          const customer = await this.gettingCustomerById(
            data?.customerDetails,
          );
          return { ...data, ...customer };
        }),
      );
      return newArr;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteSell(docId) {
    try {
      return await this.databases.deleteDocument(
        conf.appWriteDatabase,
        conf.appWriteCreateSell,
        docId,
      );
    } catch (error) {
      throw ("AppWrite :: Error :: DeleteSell :: ", error);
    }
  }

  async createOrder(
    id,
    {
      isOption,
      productAmount,
      productImage,
      productName,
      productPrice,
      productPriceOption,
      productQuantity,
      userId,
    },
  ) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabase,
        conf.appWriteOrder,
        id,
        {
          isOption,
          productAmount,
          productImage,
          productName,
          productPrice,
          productPriceOption,
          productQuantity,
          userId,
        },
      );
    } catch (error) {
      throw ("AppWrite :: CreateOrder :: ", error);
    }
  }

  async updateOrder(id, { productQuantity, productAmount }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabase,
        conf.appWriteOrder,
        id,
        { productQuantity, productAmount },
      );
    } catch (error) {
      throw ("AppWrite :: Update :: Order :: ", error);
    }
  }

  async removeOrder(id) {
    try {
      return await this.databases.deleteDocument(
        conf.appWriteDatabase,
        conf.appWriteOrder,
        id,
      );
    } catch (error) {
      throw ("AppWrite :: RemoveOrder :: ", error);
    }
  }

  async getAllOrder(currentId) {
    if (!currentId) return;
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabase,
        conf.appWriteOrder,
        [Query.equal("userId", [currentId])],
      );
    } catch (error) {
      throw ("AppWrite Getting :: All Order :: ", error);
    }
  }

  async createPdf(userId, pdfFileId, createDate) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabase,
        conf.appWritePdfCollection,
        pdfFileId,
        { userId, createDate },
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Create Pdf :: ", error);
    }
  }

  async deletePdf(slug) {
    try {
      return await this.databases.deleteDocument(slug);
    } catch (error) {
      throw ("AppWrite :: Error :: DeletePdf :: ", error);
    }
  }

  async addProductImg(File) {
    try {
      return await this.bucket.createFile(
        conf.appWriteProductImgStorage,
        ID.unique(),
        File,
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Add Product Img :: ", error);
    }
  }

  async updateProductImg(file, productId) {
    try {
      return await this.bucket.updateFile(
        conf.appWriteProductImgStorage,
        productId,
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Update Product Image :: ", error);
    }
  }

  getProductImgForPreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appWriteProductImgStorage, fileId);
    } catch (error) {
      throw "AppWrite :: Error :: Get Product Image For Preview";
    }
  }

  async deleteProductImg(productId) {
    if (!productId) return;
    try {
      return await this.bucket.deleteFile(
        conf.appWriteProductImgStorage,
        productId,
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Delete Product Image :: ", error);
    }
  }

  async addPdf(file) {
    try {
      return await this.bucket.createFile(
        conf.appWriteCreatePdf,
        ID.unique(),
        file,
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Add Product Img :: ", error);
    }
  }

  async deletePdfImg(fileId) {
    try {
      return await this.bucket.deleteFile(fileId);
    } catch (error) {
      throw ("AppWrite :: Error :: Delete Pdf Img :: ", error);
    }
  }

  getPdfForPreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appWriteCreatePdf, fileId);
    } catch (error) {
      throw "AppWrite :: Error :: Get Product Image For Preview";
    }
  }

  getPdfForDownload(fileId) {
    try {
      return this.bucket.getFileDownload(conf.appWriteCreatePdf, fileId);
    } catch (error) {
      throw ("AppWrite :: Error :: Get Pdf For Download :: ", error);
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
