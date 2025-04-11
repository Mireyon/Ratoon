import { InformationJoueuseDTO } from "./IInformationJoueuse";

const MVN_API_URL = import.meta.env.VITE_MVN_API_URL;

if (!MVN_API_URL) {
    throw new Error("MVN_API_URL is not defined");
}

export async function getInfoJoueuseAPI(name: string): Promise<any> {
    const response = await fetch(`${MVN_API_URL}/infoJoueuse/${name}`);
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données du chaton");
    }
    return await response.json();
}

export async function putInfoJoueuseAPI(nomJoueuse: string, infoJoueuse: InformationJoueuseDTO): Promise<any> {
    const response = await fetch(`${MVN_API_URL}/infoJoueuse/${nomJoueuse}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(infoJoueuse),
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour des données du chaton");
    }
    return response.status;
}

export async function getImageChatonAPI(name: string): Promise<any> {
    const response = await fetch(`${MVN_API_URL}/image/${name}`);
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données du chaton");
    }
    return await response.blob().then(blob => {
        const imgUrl = URL.createObjectURL(blob);
        return imgUrl;
    }
    );
}
