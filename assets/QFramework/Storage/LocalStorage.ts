import { AbstractUtility, IUtility } from "../Architecture/IUtility";

export interface ILocalStorage extends IUtility {

    SaveNumber(key: string, value: number): void;
    GetNumber(key: string, defaultValue?: number): number;

    SaveString(key: string, value: string): void;
    GetString(key: string, defaultValue?: string): string;

    SaveBool(key: string, value: boolean): void;
    GetBool(key: string, defaultValue?: boolean): boolean;

    SaveJsonObj(key: string, jsonObj: any): void;
    GetJsonObj(key: string, defaultObj?: any): any;
}

export class LocalStorage extends AbstractUtility {

    public SaveNumber(key: string, value: number): void {
        localStorage.setItem(key, value + "");
    }

    public GetNumber(key: string, defaultValue: number = 0): number {
        let res = localStorage.getItem(key);
        if (res == null) {
            return defaultValue;
        }
        return Number(res);
    }

    public SaveString(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    public GetString(key: string, defaultValue: string = ""): string {
        let res = localStorage.getItem(key);
        if (!res) {
            return defaultValue;
        }
        return res;
    }

    public SaveBool(key: string, value: boolean): void {
        localStorage.setItem(key, value + "");
    }

    public GetBool(key: string, defaultValue: boolean = true): boolean {
        let res = localStorage.getItem(key);
        if (res == null) {
            return defaultValue;
        }
        return Boolean(res);
    }

    public SaveJsonObj(key: string, jsonObj: any): void {
        try {
            let jsonStr = JSON.stringify(jsonObj);
            if (jsonStr != null || jsonStr != "") {
                localStorage.setItem(key, jsonStr);
            }
        } catch (error) {
            console.error("LocalStorage error: " + error);
        }
    }

    public GetJsonObj(key: string, defaultObj: any = {}) {
        let result = defaultObj;
        try {
            let local = localStorage.getItem(key);
            if (!local || local == "") {
                return result;
            }
            result = JSON.parse(local);
            if (!result) {
                return defaultObj;
            }
            return result;

        } catch (error) {
            console.error("LocalStorage error: " + error);
            return result;
        }
    }
}