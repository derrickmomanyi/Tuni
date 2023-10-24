export const decryptedData =   //slowAES
       let input = data;
          let encKey = "2fVwX6oZVM75fl5BKUtrgJMPOXM";
          let inputSplit = input.split(" ");
          let originalSize = parseInt(inputSplit[0]);
          let iv = cryptoHelpers.toNumbers(inputSplit[1]);
          let cipherIn = cryptoHelpers.toNumbers(inputSplit[2]);

          // Set up encryption parameters
          let keyAsNumbers = cryptoHelpers.toNumbers( cryptoHelpers.bin2hex( encKey ) );

          let decrypted = slowAES.decrypt(
              cipherIn,
              slowAES.modeOfOperation.CBC,
              keyAsNumbers,
              iv

          );

          // Byte-array to text
          let retVal = cryptoHelpers.hex2bin(cryptoHelpers.toHex(decrypted));
          retVal = cryptoHelpers.decode_utf8(retVal);
          retVal = JSON.parse(retVal);
          //
          console.log(retVal); 
          this.$store.commit('questions', retVal);     