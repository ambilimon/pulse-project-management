import { Axios, AxiosResponse } from 'axios';
import { Endpoints } from "../constant/constants";

export default class OrganizationService {
    private client: Axios;

    constructor(axios: Axios) {
        this.client = axios;
    }

    /**
     * Get organization all companies
     * @returns {Promise<AxiosResponse<any>>}
     */
    async getAllOrganizations(): Promise<AxiosResponse<any>> {
        return this.client
            .get(Endpoints.organization.getAll)
            .then((response) => response.data);
    }

    /**
     * Get organization by id
     * @param id
     * @returns {Promise<AxiosResponse<any>>}
     */
    async getOrganizationById(id: string): Promise<AxiosResponse<any>> {
        return this.client
            .get(Endpoints.organization.getById(id))
            .then((response) => response.data);
    }

    /**
     * Get organization by slug
     * @param slug
     * @returns {Promise<AxiosResponse<any>>}
     */
    async getOrganizationBySlug(slug: string): Promise<AxiosResponse<any>> {
        return this.client
            .get(Endpoints.organization.getBySlug(slug))
            .then((response) => response.data);
    }
}