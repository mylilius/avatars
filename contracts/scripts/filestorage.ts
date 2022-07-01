/**
 * @license
 * 
 * MyLilius Smart Contracts Configuration
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * @file filestorage.js
 * @copyright TheGreatAxios | Lilius, Inc 2022-Present
 * 
 * Questions regarding the pseudonym of TheGreatAxios can be forwarded to thegreataxios@mylilius.com
**/


import { join } from 'path';
import * as fs from 'fs';

// const { join } = require('path');
// const fs = require('fs');

// DOT_ETERNAL = '/dot_eternal'
	// DOT_CREATE = '/dot_create';
    // DOT_NAME_SERVICE = '/dot_name_service'

class FileStorage {

	BASE_DIR = '../../../deployments';

	_buildPath(dir: string, path: string) {
		return join(dir + this.BASE_DIR + '/'  + path);
	}

	_buildFullPath(dir: string, path: string, file: string) {
		return this._buildPath(dir, path) + `/${file}`;
	}

	getDir(dir: string, path: string) {
		const fullPath = join(dir + this.BASE_DIR + '/' + path);
		
		if (!fs.existsSync(fullPath)) {
			fs.mkdirSync(fullPath);
			const newPath = join(dir + this.BASE_DIR + '/' + path + '/' + 'v1');
			fs.mkdirSync(newPath);
			return 'v1';
		}

		const dirLength = fs.readdirSync(fullPath).length;
		const length = `v${dirLength+1}`;
		const newPath = join(dir + this.BASE_DIR + '/' + path + '/' + length);
		fs.mkdirSync(newPath);
		return length;
	}

	writeFile(dir: string, path: string, file: string, data: any) {
		try {
			this.getDir(dir, path);
			fs.writeFileSync(this._buildFullPath(dir, path, file), data);
		} catch (err: any) {
			throw Error(err);
		}
	}

}

export default FileStorage;