
import axios from "axios";

interface Seller {
  id: string;
  name: string;
}

export const getUsersByIds = async (
  ids: string[]
): Promise<Seller[]> => {
  const response = await axios.post<Seller[]>(
    `${process.env.USER_SERVICE_URL}/users/internal/batch`,
    { ids },
    {
      headers: {
        "x-service-token": process.env.SERVICE_SECRET,
      },
      timeout: 5000,
    }
  );

  return response.data;
};
