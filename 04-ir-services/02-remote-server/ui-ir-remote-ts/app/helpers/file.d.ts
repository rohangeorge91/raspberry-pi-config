type StringArray = Array<string>

type LocationType = 'file' | 'folder'

type FileDirectory = {
	file: StringArray,
	folder: StringArray
}

// export const createDirectory = (file: StringArray, folder: StringArray): FileDirectory