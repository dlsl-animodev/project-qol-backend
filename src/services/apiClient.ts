import axios from "axios";
import { config } from "../config/env";
import type { StudentInfo } from "../types/student";

export interface ApiResponse {
  success: boolean;
  student?: StudentInfo;
  error?: string;
}

/**
 * Fetches student information from the API service
 * @param cardTagUid - The student's card tag UID
 * @returns Promise<StudentInfo>
 */

export async function fetchStudentFromApi(cardTagUid: string): Promise<StudentInfo> {
  try {
    const response = await axios.get<StudentInfo>(`${config.apiServiceUrl}/api/student`, {
      params: { id: cardTagUid },
      timeout: 10000,
    });


    if (!response.data || !response.data.card_tag_uid) {
      throw new Error("Student not found");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Student not found");
      }
      throw new Error(`API Service Error: ${error.response?.data?.error || error.message}`);
    }
    throw error;
  }
}