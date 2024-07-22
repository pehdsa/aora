import { Client, Account, ID, Avatars, Databases, Storage, Query } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.pedro.aora",
    projectId: "6698864900074664dbbb",
    databaseId: "669887c2000964050477",
    userCollectionId: "669887e3000d0d2976ae",
    videoCollectionId: "66988812001d61244284",
    storageId: "66988945003468682280"
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storages = new Storage(client);

export const createUser = async ({ username, email, password }: { username: string, email: string, password: string }) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn({ email, password });

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        );

        return newUser;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message)
          } else {
            console.error('Um erro desconhecido ocorreu:', error);
            throw new Error('Um erro desconhecido ocorreu')
          }
    }
}

export const signIn = async ({ email, password }: { email: string, password: string }) => {
    try {
        const session = await account.createEmailPasswordSession(
            email,
            password
        )
        return session;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message)
          } else {
            console.error('Um erro desconhecido ocorreu:', error);
            throw new Error('Um erro desconhecido ocorreu')
          }
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw new Error;

        const currenUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currenUser) throw new Error;
        return currenUser.documents[0];
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message)
          } else {
            console.error('Um erro desconhecido ocorreu:', error);
            throw new Error('Um erro desconhecido ocorreu')
          }
    }
}

export async function getAllPosts() {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            //@ts-ignore
            [Query.orderDesc('$createdAt', Query.limit(7))]
        );

        return posts.documents;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            console.error('Um erro desconhecido ocorreu:', error);
            throw new Error('Um erro desconhecido ocorreu')
        }
    }
}

export async function getLatestPosts() {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            //@ts-ignore
            [Query.orderDesc('$createdAt', Query.limit(7))]
        );

        return posts.documents;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            console.error('Um erro desconhecido ocorreu:', error);
            throw new Error('Um erro desconhecido ocorreu')
        }
    }
}

export async function searchPost(query: string) {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.search('title', query)]
        );
        
        return posts.documents;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            console.error('Um erro desconhecido ocorreu:', error);
            throw new Error('Um erro desconhecido ocorreu')
        }
    }
}

export async function getUserPost(userId: string) {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            //@ts-ignore
            [Query.equal('creator', userId), Query.orderDesc('$createdAt', Query.limit(7))]
        );
        
        return posts.documents;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            console.error('Um erro desconhecido ocorreu:', error);
            throw new Error('Um erro desconhecido ocorreu')
        }
    }
}

export async function signOut() {
    try {
        const sesion = await account.deleteSession('current')
        return sesion;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            console.error('Um erro desconhecido ocorreu:', error);
            throw new Error('Um erro desconhecido ocorreu')
        }
    }
}

async function uploadFile(file: any, type: string){
    if (!file) return;
    const { mineType, ...rest } = file;
    const asset = { type: mineType, ...rest };
    try {
        const uploadedFile = await storages.createFile(
            config.storageId,
            ID.unique(),
            asset
        );
    
        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            console.error('Um erro desconhecido ocorreu:', error);
            throw new Error('Um erro desconhecido ocorreu')
        }
    }
}

export async function getFilePreview(fileId: string, type: string) {
    let fileUrl;

    try {
        if (type === "video") {
            fileUrl = storages.getFileView(config.storageId, fileId);
        } else if (type === "image") {
            //@ts-ignore
            fileUrl = storages.getFilePreview(config.storageId,fileId,2000,2000,"top",100);
        } else {
            throw new Error("Invalid file type");
        }

        if (!fileUrl) throw Error;

        return fileUrl;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            console.error('Um erro desconhecido ocorreu:', error);
            throw new Error('Um erro desconhecido ocorreu')
        }
    }
}

export async function createVideo(form: { title: string, video: any, thumbnail: any, prompt: string, userId: string }) {
    try {
        // const sesion = await account.deleteSession('current')
        // return sesion;
        const [ thumbnail, videoUrl ] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video'),
        ])

        const newPost = await databases.createDocument(
            config.databaseId,
            config.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: form.thumbnail,
                video: form.video,
                prompt: form.prompt,
                creator: form.userId
            }
        )

        return newPost;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            console.error('Um erro desconhecido ocorreu:', error);
            throw new Error('Um erro desconhecido ocorreu')
        }
    }
}