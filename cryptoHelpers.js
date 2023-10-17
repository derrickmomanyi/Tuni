/*
 * cryptoHelpers.js: implements AES - Advanced Encryption Standard
 * from the SlowAES project, http://code.google.com/p/slowaes/
 *
 * Copyright (c) 2008 	Josh Davis ( http://www.josh-davis.org ),
 *						Mark Percival ( http://mpercival.com ),
 *						Johan Sundstrom ( http://ecmanaut.blogspot.com ),
 *			 			John Resig ( http://ejohn.org )
 *
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/
 */

 export const cryptoHelpers = {
	hex2bin:function(s) {
		//  discuss at: https://locutus.io/php/hex2bin/
		// original by: Dumitru Uzun (https://duzun.me)
		//   example 1: hex2bin('44696d61')
		//   returns 1: 'Dima'
		//   example 2: hex2bin('00')
		//   returns 2: '\x00'
		//   example 3: hex2bin('2f1q')
		//   returns 3: false
		const ret = []
		let i = 0
		let l
		s += ''
		for (l = s.length; i < l; i += 2) {
			const c = parseInt(s.substr(i, 1), 16)
			const k = parseInt(s.substr(i + 1, 1), 16)
			if (isNaN(c) || isNaN(k)) return false
			ret.push((c << 4) | k)
		}
		return String.fromCharCode.apply(String, ret)
	},
	bin2hex:function(s) {
		//  discuss at: https://locutus.io/php/bin2hex/
		// original by: Kevin van Zonneveld (https://kvz.io)
		// bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
		// bugfixed by: Linuxworld
		// improved by: ntoniazzi (https://locutus.io/php/bin2hex:361#comment_177616)
		//   example 1: bin2hex('Kev')
		//   returns 1: '4b6576'
		//   example 2: bin2hex(String.fromCharCode(0x00))
		//   returns 2: '00'
		let i
		let l
		let o = ''
		let n
		s += ''
		for (i = 0, l = s.length; i < l; i++) {
			n = s.charCodeAt(i)
				.toString(16)
			o += n.length < 2 ? '0' + n : n
		}
		return o
	},
	// encodes a unicode string to UTF8 (8 bit characters are critical to AES functioning properly)
	encode_utf8:function(s)
	{
		try{return unescape(encodeURIComponent(s));}
		catch(e){throw 'error during utf8 encoding: cryptoHelpers.encode_utf8.';}
	},

	// decodes a UTF8 string back to unicode
	decode_utf8:function(s)
	{
		try{return decodeURIComponent(escape(s));}
		catch(e){throw('error during utf8 decoding: cryptoHelpers.decode_utf8.');}
	},

	//convert a number array to a hex string
	toHex:function()
	{
		let array = [];
		if(arguments.length == 1 && arguments[0].constructor == Array)
			array = arguments[0];
		else
			array = arguments;
		let ret = '';
		for(let i = 0;i < array.length;i++)
			ret += (array[i] < 16 ? '0' : '') + array[i].toString(16);
		return ret.toLowerCase();
	},

	//convert a hex string to a number array
	toNumbers:function(s)
	{
		let ret = [];
		s.replace(/(..)/g,function(s){
			ret.push(parseInt(s,16));
		});
		return ret;
	},

	// get a random number in the range [min,max]
	getRandom:function(min,max)
	{
		if(min === null)
			min = 0;
		if(max === null)
			max = 1;
		return Math.floor(Math.random()*(max+1)) + min;
	},

	generateSharedKey:function(len)
	{
		if(len === null)
			len = 16;
		let key = [];
		for(let i = 0; i < len*2; i++)
			key.push(this.getRandom(0,255));
		return key;
	},

	generatePrivateKey:function(s,size)
	{
		let sha = jsHash.sha2.arr_sha256(s);
		return sha.slice(0,size);
	},

	convertStringToByteArray: function(s)
	{
		let byteArray = [];
		for(let i = 0;i < s.length;i++)
				{
						byteArray.push(s.charCodeAt(i));
				}
		return byteArray;
	},

	convertByteArrayToString: function(byteArray)
	{
		let s = '';
		for(let i = 0;i < byteArray.length;i++)
				{
						s += String.fromCharCode(byteArray[i])
				}
		return s;
	},

	base64: {
		// Takes a Nx16x1 byte array and converts it to Base64
		chars: [
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
		'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
		'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
		'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
		'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
		'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
		'w', 'x', 'y', 'z', '0', '1', '2', '3',
		'4', '5', '6', '7', '8', '9', '+', '/',
		'=', // for decoding purposes
		],

		encode_line: function(flatArr){
			let b64 = '';

			for (let i = 0; i < flatArr.length; i += 3){
				b64 += this.chars[flatArr[i] >> 2];
				b64 += this.chars[((flatArr[i] & 3) << 4) | (flatArr[i + 1] >> 4)];
				if (!(flatArr[i + 1] == null)){
					b64 += this.chars[((flatArr[i + 1] & 15) << 2) | (flatArr[i + 2] >> 6)];
				}else{
					b64 += '=';
				}
				if (!(flatArr[i + 2] == null)){
					b64 += this.chars[flatArr[i + 2] & 63];
				}else{
					b64 += '=';
				}
			}
			return b64;
		},

		encode: function(flatArr)
		{
			let b64 = this.encode_line(flatArr);
			// OpenSSL is super particular about line breaks
			let broken_b64 = b64.slice(0, 64) + '\n';
			for (let i = 1; i < (Math.ceil(b64.length / 64)); i++)
			{
				broken_b64 += b64.slice(i * 64, i * 64 + 64) + (Math.ceil(b64.length / 64) == i + 1 ? '': '\n');
			}
			return broken_b64;
		},

	    decode: function(string)
		{
			string = string.replace(/[\r\n\t ]+/g, '') + '===='; // drop all whitespaces and pad with '=' (end of b64 marker)
			let flatArr = [];
			let c = [];
			let b = [];
			for (let i = 0; ; i = i + 4){
				c[0] = this.chars.indexOf(string.charAt(i));
				if(c[0] == 64){
					return flatArr;
				}
				c[1] = this.chars.indexOf(string.charAt(i + 1));
				c[2] = this.chars.indexOf(string.charAt(i + 2));
				c[3] = this.chars.indexOf(string.charAt(i + 3));

				if(
					(c[0] < 0) || // char1 is wrong
					(c[1] < 0) || (c[1] == 64) || // char2 is wrong
					(c[2] < 0) || // char3 is neither an valid char nor '='
					(c[3] < 0)    // char4 is neither an valid char nor '='
				){
					throw 'error during base64 decoding at pos '+i+': cryptoHelpers.base64.decode.';
				}

				flatArr.push((c[0] << 2) | (c[1] >> 4));
				if(c[2] >= 0 && c[2] < 64){
					flatArr.push(((c[1] & 15) << 4) | (c[2] >> 2));
					if(c[3] >= 0 && c[2] < 64){
						flatArr.push(((c[2] & 3) << 6) | c[3]);
					}
				}
			}
		},

	},

};
