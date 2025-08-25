import React from 'react'

const useCreateNewsletter = (storeId) => {

    const createNewsletter = async (data) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/newsletter/newsletters/${storeId}/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('뉴스레터 생성에 실패했습니다.');
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    
    return createNewsletter;
}

export default useCreateNewsletter