/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ModelsMonitoringRequest {
  admin?: string;
  adminId?: number;
  creationDate?: string;
  creator?: string;
  endingDate?: string;
  formationDate?: string;
  requestId?: number;
  status?: string;
  userId?: number;
}

export interface ModelsNewStatus {
  status?: string;
}

export interface ModelsThreat {
  count?: number;
  description?: string;
  image?: string;
  name?: string;
  price?: number;
  summary?: string;
  threatId?: number;
}

export interface ModelsUser {
  isAdmin?: boolean;
  /** @maxLength 64 */
  login: string;
  name?: string;
  /**
   * @minLength 8
   * @maxLength 64
   */
  password: string;
  registrationDate?: string;
  userId?: number;
}

export interface ModelsUserLogin {
  /** @maxLength 64 */
  login: string;
  /**
   * @minLength 8
   * @maxLength 64
   */
  password: string;
}

export interface ModelsUserSignUp {
  /** @maxLength 64 */
  login: string;
  /**
   * @minLength 8
   * @maxLength 64
   */
  password: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:3001", withCredentials : true});
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title ThreatMonitoringApp
 * @version 1.0
 * @baseUrl http://localhost:3001
 * @contact
 *
 * App for serving threats monitoring requests
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Retrieves user information based on the provided user context
     *
     * @tags Authentication
     * @name CheckAuthList
     * @summary Check user authentication
     * @request GET:/api/check-auth
     */
    checkAuthList: (params: RequestParams = {}) =>
      this.request<ModelsUser, string>({
        path: `/api/check-auth`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Logs out the user by blacklisting the access token
     *
     * @tags Authentication
     * @name LogoutCreate
     * @summary Logout
     * @request POST:/api/logout
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/logout`,
        method: "POST",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Deletes a threat from a request based on the user ID and threat ID
     *
     * @tags MonitoringRequests
     * @name MonitoringRequestThreatsThreatsDelete
     * @summary Delete threat from request
     * @request DELETE:/api/monitoring-request-threats/threats/{threatId}
     */
    monitoringRequestThreatsThreatsDelete: (threatId: number, params: RequestParams = {}) =>
      this.request<Record<string, any>, any>({
        path: `/api/monitoring-request-threats/threats/${threatId}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes a monitoring request for the given user ID
     *
     * @tags MonitoringRequests
     * @name MonitoringRequestsDelete
     * @summary Delete monitoring request by user ID
     * @request DELETE:/api/monitoring-requests
     */
    monitoringRequestsDelete: (params: RequestParams = {}) =>
      this.request<Record<string, any>, any>({
        path: `/api/monitoring-requests`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves a list of monitoring requests based on the provided parameters
     *
     * @tags MonitoringRequests
     * @name MonitoringRequestsList
     * @summary Get list of monitoring requests
     * @request GET:/api/monitoring-requests
     */
    monitoringRequestsList: (
      query?: {
        /** Monitoring request status */
        status?: string;
        /** Start date in the format '2006-01-02T15:04:05Z' */
        start_date?: string;
        /** End date in the format '2006-01-02T15:04:05Z' */
        end_date?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ModelsMonitoringRequest[], any>({
        path: `/api/monitoring-requests`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves a monitoring request with the given ID
     *
     * @tags MonitoringRequests
     * @name MonitoringRequestsDetail
     * @summary Get monitoring request by ID
     * @request GET:/api/monitoring-requests/{id}
     */
    monitoringRequestsDetail: (id: number, params: RequestParams = {}) =>
      this.request<Record<string, any>, any>({
        path: `/api/monitoring-requests/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the status of a monitoring request by client on formated
     *
     * @tags MonitoringRequests
     * @name MonitoringRequestsClientUpdate
     * @summary Update monitoring request status by client
     * @request PUT:/api/monitoring-requests/client
     */
    monitoringRequestsClientUpdate: (newStatus: ModelsNewStatus, params: RequestParams = {}) =>
      this.request<Record<string, string>, any>({
        path: `/api/monitoring-requests/client`,
        method: "PUT",
        body: newStatus,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Authenticates a user and generates an access token
     *
     * @tags Authentication
     * @name SignInCreate
     * @summary User sign-in
     * @request POST:/api/signIn
     */
    signInCreate: (user: ModelsUserLogin, params: RequestParams = {}) =>
      this.request<Record<string, any>, any>({
        path: `/api/signIn`,
        method: "POST",
        body: user,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new user account
     *
     * @tags Authentication
     * @name SignUpCreate
     * @summary Sign up a new user
     * @request POST:/api/signUp
     */
    signUpCreate: (user: ModelsUserSignUp, params: RequestParams = {}) =>
      this.request<Record<string, any>, any>({
        path: `/api/signUp`,
        method: "POST",
        body: user,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves a list of threats based on the provided query.
     *
     * @tags Threats
     * @name ThreatsList
     * @summary Get threats list
     * @request GET:/api/threats
     */
    threatsList: (
      query?: {
        /** Query string to filter threats */
        query?: string;
        /** LowPrice to filter threats */
        lowPrice?: number;
        /** HighPrice string to filter threats */
        highPrice?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Record<string, any>, any>({
        path: `/api/threats`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Add a new threat with image, name, description, count, and price
     *
     * @tags Threats
     * @name ThreatsCreate
     * @summary Add new threat
     * @request POST:/api/threats
     */
    threatsCreate: (
      data: {
        /**
         * Threat image
         * @format binary
         */
        image: File;
        /** Threat name */
        name: string;
        /** Threat description */
        description?: string;
        /** Threat count */
        count: number;
        /** Threat price */
        price: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, Record<string, any>>({
        path: `/api/threats`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes a threat with the given ID
     *
     * @tags Threats
     * @name ThreatsDelete
     * @summary Delete threat by ID
     * @request DELETE:/api/threats/{id}
     */
    threatsDelete: (id: number, params: RequestParams = {}) =>
      this.request<Record<string, any>, any>({
        path: `/api/threats/${id}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves a threat by its ID
     *
     * @tags Threats
     * @name ThreatsDetail
     * @summary Get threat by ID
     * @request GET:/api/threats/{id}
     */
    threatsDetail: (id: number, params: RequestParams = {}) =>
      this.request<ModelsThreat, any>({
        path: `/api/threats/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Updates a threat with the given ID
     *
     * @tags Threats
     * @name ThreatsUpdate
     * @summary Update threat by ID
     * @request PUT:/api/threats/{id}
     */
    threatsUpdate: (
      id: number,
      data: {
        /** name */
        name?: string;
        /** description */
        description?: string;
        /** count */
        count?: string;
        /** price */
        price?: string;
        /** image */
        image?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<Record<string, any>, any>({
        path: `/api/threats/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Adds a threat to a monitoring request
     *
     * @tags Threats
     * @name ThreatsRequestCreate
     * @summary Add threat to request
     * @request POST:/api/threats/request/{threatId}
     */
    threatsRequestCreate: (threatId: number, params: RequestParams = {}) =>
      this.request<Record<string, any>, any>({
        path: `/api/threats/request/${threatId}`,
        method: "POST",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  monitoringRequests = {
    /**
     * @description Updates the status of a monitoring request with the given ID on "accepted"/"closed"/"canceled"
     *
     * @tags MonitoringRequests
     * @name AdminUpdate
     * @summary Update monitoring request status by ID
     * @request PUT:/monitoring-requests/admin/{requestId}
     */
    adminUpdate: (requestId: number, newRequestStatus: ModelsNewStatus, params: RequestParams = {}) =>
      this.request<Record<string, any>, any>({
        path: `/monitoring-requests/admin/${requestId}`,
        method: "PUT",
        body: newRequestStatus,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
