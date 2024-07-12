import conf from "../config/config";
import { Client, Databases, Storage, ID, Query } from "appwrite";
import authService from "./auth";

const findPercentage = (thisMonth, lastMonth) => {
  if (lastMonth === 0) {
    return thisMonth === 0 ? "0%" : "Infinity%";
  }

  const increasingValue = thisMonth - lastMonth;
  const percentage = (increasingValue / lastMonth) * 100;

  return `${percentage.toFixed(2)}%`;
};

function getCustomDate(number) {
  const date = new Date();
  date.setDate(date.getDate() - number);
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

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
    this.deleteSell = this.deleteSell.bind(this);
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
      totalPrice,
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
          totalPrice,
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

  async gettingAllCustomer(belongsTo, offsetNumber = 0) {
    if (!belongsTo) return [];
    try {
      const { documents = [], total } = await this.databases.listDocuments(
        conf.appWriteDatabase,
        conf.appWriteCustomerDetailsCollId,
        [
          Query.equal("belongsTo", belongsTo),
          Query.limit(9),
          Query.offset(offsetNumber),
        ],
      );
      return { documents, total };
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

  async getProductList(id) {
    if (!id) return [];
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabase,
        conf.appWriteProductsListCollId,
        [Query.equal("userId", id)],
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

  async createSell({ customerDetails, productList, userId, totalAmount }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabase,
        conf.appWriteCreateSell,
        ID.unique(),
        { customerDetails, productList, userId, totalAmount },
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Create Sell :: ", error);
    }
  }

  async updateSell(slug, { customerDetails, productList, productName }) {
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
    if (!belongsTo) return [];
    try {
      let { documents = [], total = "" } = await this.databases.listDocuments(
        conf.appWriteDatabase,
        conf.appWriteCreateSell,
        [
          Query.equal("userId", belongsTo),
          Query.limit(10),
          Query.offset(offsetNumber),
        ],
      );
      const newArr = await Promise.all(
        Array.isArray(documents) &&
          documents.map(async (data) => {
            const response = await this.gettingCustomerById(
              data?.customerDetails,
            );
            const { customerName, phoneNumber, totalPrice, totalUdhar } =
              response;
            data.productList = JSON.parse(data.productList);
            return {
              ...data,
              customerName,
              phoneNumber,
              totalPrice,
              totalUdhar,
            };
          }),
      );
      return { data: newArr.reverse(), total };
    } catch (error) {
      throw new Error("Appwrite :: Error :: getInvice :: ", error.message);
    }
  }

  async getInvoiceById(id) {
    try {
      const response = await this.databases.getDocument(
        conf.appWriteDatabase,
        conf.appWriteCreateSell,
        id,
      );
      response.productList = JSON.parse(response.productList);
      return [...response.productList];
    } catch (error) {
      throw new Error("AppWrite :: Error :: gettingOnlyInvoice :: ", error);
    }
  }

  async getCustomerBuyHistory(id) {
    if (!id) return;
    try {
      const invoiceData = await this.databases.listDocuments(
        conf.appWriteDatabase,
        conf.appWriteCreateSell,
        [Query.equal("customerDetails", id)],
      );
      const filteredData = invoiceData?.documents.map((invoData) => {
        const productList = JSON.parse(invoData?.productList);
        return { ...invoData, productList };
      });
      return filteredData;
    } catch (error) {
      throw new Error(
        `Appwrite :: Error :: while getting the customer buy history ${error}`,
      );
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

  async deleteCustomerInvoice(user_id) {
    if (!user_id) return;
    try {
      const invoiceList = await this.databases.listDocuments(
        conf.appWriteDatabase,
        conf.appWriteCreateSell,
        [Query.equal("userId", user_id)],
      );

      await Promise.all(
        invoiceList.map(async (data) => {
          return await this.databases.deleteDocument(
            conf.appWriteDatabase,
            conf.appWriteCreateSell,
            data?.$id,
          );
        }),
      );
    } catch (error) {
      throw new Error(
        `Something went wrong while deleting the customer ${error}`,
      );
    }
  }
}

class DashBoardService extends DatabaseService {
  constructor() {
    super();
    this.totalCustomerWithPercentage =
      this.totalCustomerWithPercentage.bind(this);
  }
  async getAllSellData(user_id) {
    try {
      const { documents, total } = await this.databases.listDocuments(
        conf.appWriteDatabase,
        conf.appWriteCreateSell,
        [Query.equal("userId", user_id)],
      );
      return { documents, total };
    } catch (error) {
      throw new Error(`Something went wrong while fetching the sell data`);
    }
  }

  async totalCustomerWithPercentage(user_id) {
    try {
      const { documents, total } = await this.databases.listDocuments(
        conf.appWriteDatabase,
        conf.appWriteCustomerDetailsCollId,
        [Query.equal("belongsTo", user_id)],
      );

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const previousMonth = currentMonth === 0 ? 1 : currentMonth - 1;
      const currentYear = currentDate.getFullYear();
      const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

      const [currentMonDocs, prevMonDocs] = documents.reduce(
        (acc, current) => {
          const [year, month] = current.$createdAt.split("-").map(Number);
          if (year === currentYear && month === currentMonth) {
            acc[0].push(current);
          } else if (
            (year === currentYear && month === previousMonth) ||
            (year === previousYear && month === previousMonth)
          ) {
            acc[1].push(current);
          }
          return acc;
        },
        [[], []],
      );

      const getPercentage = findPercentage(
        currentMonDocs.length,
        prevMonDocs.length,
      );

      return { customerCount: total, percentage: getPercentage };
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching total customer ${error}`,
      );
    }
  }

  async getSellToday(user_id) {
    const currentDay = getCustomDate(0);
    const yesterDay = getCustomDate(1);
    const nextToYesterDay = getCustomDate(2);

    const { documents } = await this.getAllSellData(user_id);

    let currentDaySell = 0;
    let previousDaySell = 0;

    for (let i = documents.length - 1; i >= 0; i--) {
      const current = documents[i];
      let [year, month, day] = current.$createdAt.split("-");
      year = Number(year);
      month = Number(month);
      day = Number(day.slice(0, 2));
      // console.log(current);
      if (
        year === currentDay.year &&
        month === currentDay.month &&
        day === currentDay.day
      ) {
        currentDaySell += current.totalAmount;
      } else if (
        year === yesterDay.year &&
        month === yesterDay.month &&
        yesterDay.day === day
      ) {
        previousDaySell += current.totalAmount;
      } else if (
        year === nextToYesterDay.year &&
        month === nextToYesterDay.month &&
        day === nextToYesterDay.day
      ) {
        break;
      }
    }

    const percentage = findPercentage(currentDaySell, previousDaySell);

    return { currentDaySell, percentage };
  }

  async getMonthlySell(user_id) {
    const { documents } = await this.getAllSellData(user_id);

    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const fullYear = date.getFullYear();
    const currentPrevYear = currentMonth === 1 ? fullYear - 1 : fullYear;
    const prevTwoMonth = getCustomDate(3);

    let currentMonthTotalSell = 0;
    let previousMonthTotalSell = 0;
    for (let i = documents.length - 1; i >= 0; i--) {
      const current = documents[i];
      const [year, month] = current.$createdAt.split("-").map(Number);
      if (year === currentPrevYear && currentMonth === month)
        currentMonthTotalSell += current.totalAmount;
      else if (year === currentPrevYear && month === previousMonth) {
        previousMonthTotalSell += current.totalAmount;
      } else if (year === prevTwoMonth.year && month === prevTwoMonth.month) {
        break;
      }
    }

    const percentage = findPercentage(
      currentMonthTotalSell,
      previousMonthTotalSell,
    );
    return { currentMonthTotalSell, percentage };
  }

  async getYearlySell(user_id) {
    const { documents } = await this.getAllSellData(user_id);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const previousYear = currentYear - 1;

    let previousYearTotalAmount = 0;
    let currentYearTotalAmount = 0;

    let docLength = documents.length;
    while (docLength--) {
      const current = documents[docLength];
      const year = Number(current.$createdAt.split("-")[0]);
      if (year === currentYear) currentYearTotalAmount += current.totalAmount;
      else if (year === previousYear)
        previousYearTotalAmount += current.totalAmount;
      else if (year === previousYear - 1) break;
    }

    const percentage = findPercentage(
      currentYearTotalAmount,
      previousYearTotalAmount,
    );
    return { currentYearTotalAmount, percentage };
  }

  async getYearlySellByMonth(user_id) {
    const { documents } = await this.getAllSellData(user_id);
    const date = new Date();
    const fullYear = date.getFullYear();

    let totalSellData = Array(12).fill(undefined);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    for (let i = documents.length - 1; i >= 0; i--) {
      const current = documents[i];
      const [year, month] = current.$createdAt.split("-").map(Number);
      if (year === fullYear - 1) break;
      if (!totalSellData[month - 1]) {
        totalSellData[month - 1] = {
          month: months[month - 1],
          Amount: current.totalAmount,
        };
      } else {
        totalSellData[month - 1].Amount += current.totalAmount;
      }
    }

    totalSellData = totalSellData.map((items, index) => {
      if (!items) {
        return {
          month: months[index],
          Amount: 0,
        };
      } else {
        return items;
      }
    });

    return totalSellData;
  }

  async getTopBuyingCustomer(user_id) {
    try {
      const { documents = [] } = await this.databases.listDocuments(
        conf.appWriteDatabase,
        conf.appWriteCustomerDetailsCollId,
        [Query.orderDesc("totalPrice"), Query.equal("belongsTo", user_id)],
      );
      return documents;
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching the customer data ${error}`,
      );
    }
  }

  async getProductBySellAmount(user_id) {
    try {
      const { documents: sellDocList = [] } =
        await this.databases.listDocuments(
          conf.appWriteDatabase,
          conf.appWriteCreateSell,
          [Query.equal("userId", user_id)],
        );
      const totalProductAmount = sellDocList.reduce((acc, current) => {
        const productList = JSON.parse(current.productList);
        productList.forEach((items) => {
          const isExit = acc.find((data) => data.$id === items.$id);
          if (isExit) {
            isExit.totalAmount += items.productAmount;
          } else {
            acc.push({
              $id: items.$id,
              totalAmount: items.productAmount,
              name: items.productName,
            });
          }
        });
        return acc;
      }, []);

      // const totalProductAmount = [];
      // sellDocList.forEach((items) => {
      //   const listProduct = JSON.parse(items.productList);
      //   listProduct.forEach((data) => {
      //     const isExit = totalProductAmount.find(
      //       (existData) => existData?.$id === data.$id,
      //     );
      //     if (isExit) {
      //       isExit.totalAmount += data.productAmount;
      //     } else {
      //       totalProductAmount.push({
      //         $id: data.$id,
      //         totalAmount: data.productAmount,
      //         productName: data.productName,
      //       });
      //     }
      //   });
      // });
      return totalProductAmount;
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching the product by sell ${error}`,
      );
    }
  }

  async allData() {
    try {
      const currentSession = await authService.getCurrentUser();
      console.log(currentSession?.$id);

      if (currentSession) {
        const [
          totalCustomer,
          sellToday,
          monthlySell,
          yearlySell,
          yearlySellByMonth,
          TopBuyingCustomer,
          productBySell,
        ] = await Promise.all([
          this.totalCustomerWithPercentage(currentSession?.$id),
          this.getSellToday(currentSession?.$id),
          this.getMonthlySell(currentSession?.$id),
          this.getYearlySell(currentSession?.$id),
          this.getYearlySellByMonth(currentSession?.$id),
          this.getTopBuyingCustomer(currentSession?.$id),
          this.getProductBySellAmount(currentSession?.$id),
        ]);

        return {
          totalCustomer,
          sellToday,
          monthlySell,
          yearlySell,
          yearlySellByMonth,
          TopBuyingCustomer,
          productBySell,
        };
      }
    } catch (error) {
      throw new Error(`Something went wrong ${error}`);
    }
  }
}

const databaseService = new DatabaseService();
const dashBoardData = new DashBoardService();
export { databaseService, dashBoardData };
