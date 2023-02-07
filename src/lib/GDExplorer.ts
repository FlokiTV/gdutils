import type { GameData } from './GD.types';

class GDExplorer {
	/**
	 * @description .json full path
	 */
	public gameFilePath = '';
	/**
	 * @description .json game file name
	 */
	public gameFile = '';
	/**
	 * @description .json game file path
	 */
	public gamePath = '';
	/**
	 * @description .json parsed content
	 */
	public gameData = {};
	
	/**
	 * @description read .json game file and parse as json to `GDExplorer.gameData`
	 */
	public async readGameFile(data:any): Promise<any> {
		data = JSON.parse(data);
		if (!data.hasOwnProperty('gdVersion'))
			return {
				error: 'Select a valid GDevelop game file'
			};
		this.gameData = data;
		return {
			success: true
		};
	}
	/**
	 * @description get game data
	 */
	public getData() {
		return this.gameData as GameData;
	}
	/**
	 * @description get game data properties
	 */
	public getProperties() {
		let d = this.gameData as GameData;
		return d.properties;
	}
}

export default new GDExplorer();
