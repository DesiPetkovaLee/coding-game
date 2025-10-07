export const getDataById = async (
    id: number,
    apiEndPoint: string,
    message: string
) => {
    const response = await fetch(
        `http://localhost:8080/api/${apiEndPoint}/${id}`,
        {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        }
    );
    if (!response.ok) {
        throw new Error(`Failed to fetch data for ${message}`);
    }
    return response.json();
};

export const getAllData = async (apiEndPoint: string, message: string) => {
    const response = await fetch(`http://localhost:8080/api/${apiEndPoint}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch data for ${message}`);
    }
    return response.json();
};

export async function deleteDataById(
    //header: string,
    apiEndPoint: string,
    id: number,
    message: string
) {
    const response = await fetch(
        `http://localhost:8080/api/${apiEndPoint}/${id}`,
        {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                //Authorization: `Bearer ${header}`,
            },
            credentials: "include",
        }
    );
    if (!response.ok) {
        throw new Error(`Failed to create data for ${message}`);
    }
    return await response;
}

export async function createData<T extends object>(
    //header: string,
    apiEndPoint: string,
    message: string,
    fields: T
) {
    const response = await fetch(`http://localhost:8080/api/${apiEndPoint}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            //Authorization: `Bearer ${header}`,
        },
        credentials: "include",
        body: JSON.stringify(
            fields,
        ),
    });
    if (!response.ok) {
        throw new Error(`Failed to create data for ${message}`);
    }
    return await response.json();
}

export async function updateData<T extends object>(
    //header: string,
    apiEndPoint: string,
    id: number,
    message: string,
    fields: T
) {
    const response = await fetch(
        `http://localhost:8080/api/${apiEndPoint}/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                //Authorization: `Bearer ${header}`,
            },
            credentials: "include",
            body: JSON.stringify(fields),
        }
    );
    if (!response.ok) {
        console.log(JSON.stringify({ fields }));
        throw new Error(`Failed to update ${message} for id: ${id}`);
    }
    return await response.json();
}
