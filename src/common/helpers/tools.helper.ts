import smsRequest = require('request');
import CryptoJS from 'crypto-js';
export class Tools {
  convertToSlug(Text) {
    return Text.toLowerCase()
      .replace(/ /g, '-')
      .replace(/-{6}/g, '-')
      .replace(/-{5}/g, '-')
      .replace(/-{4}/g, '-')
      .replace(/-{3}/g, '-')
      .replace(/--/g, '-')
      .replace(/,/g, '')
      .replace(/،/g, '')
      .replace(/#/g, '')
      .replace(/@/g, '')
      .replace(/$/g, '')
      .replace(/!/g, '')
      .replace(/&/g, '')
      .replace(/؟/g, '');
    // .replace(new RegExp('(', 'g'), '')
    // .replace(new RegExp(')', 'g'), '')
    // .replace(new RegExp('"', 'g'), '')
    // .replace(new RegExp("'", 'g'), '')
    // .replace(new RegExp(`/`, 'g'), '')
    // .replace(new RegExp('?', 'g'), '');
  }
  normalize(text) {
    text = text.replace(/ {5}/g, '');
    text = text.replace(/ {4}/g, '');
    text = text.replace(/ {3}/g, '');
    text = text.replace(/ {2}/g, '');
    text = text.replace(/ {1}/g, '');
    text = text.replace(/,/g, '');
    text = text.replace(/،/g, '');
    text = text.replace(/#/g, '');
    text = text.replace(/@/g, '');
    text = text.replace(/$/g, '');
    text = text.replace(/!/g, '');
    text = text.replace(/&/g, '');
    text = text.replace('(', '');
    text = text.replace(')', '');
    text = text.replace('(', '');
    text = text.replace(')', '');
    text = text.replace(/؟/g, '');
    text = text.replace('?', '');
    return text;
  }
  toInt(str) {
    str = str.replace(/٠/g, '0');
    str = str.replace(/١/g, '1');
    str = str.replace(/٢/g, '2');
    str = str.replace(/٣/g, '3');
    str = str.replace(/٤/g, '4');
    str = str.replace(/٥/g, '5');
    str = str.replace(/٦/g, '6');
    str = str.replace(/٧/g, '7');
    str = str.replace(/٨/g, '8');
    str = str.replace(/٩/g, '9');
    str = str.replace(/۰/g, '0');
    str = str.replace(/۱/g, '1');
    str = str.replace(/۲/g, '2');
    str = str.replace(/۳/g, '3');
    str = str.replace(/۴/g, '4');
    str = str.replace(/۵/g, '5');
    str = str.replace(/۶/g, '6');
    str = str.replace(/۷/g, '7');
    str = str.replace(/۸/g, '8');
    str = str.replace(/۹/g, '9');
    return str;
  }
  checkMime(filename) {
    const i = filename.lastIndexOf('.');
    const memeType = filename.substr(i + 1);
    const imgList = ['jpg', 'jpeg', 'png', 'gif', 'JPG', 'JPEG', 'PNG', 'GIF'];
    const videoList = ['mp4', 'MP4'];
    const musicList = ['mp3', 'MP3'];
    const fileList = ['xls', 'pdf', 'doc', 'docx', 'apk'];
    const xlsFiles = ['xlsx'];
    if (imgList.indexOf(memeType) !== -1) {
      return 1;
    } else if (videoList.indexOf(memeType) !== -1) {
      return 3;
    } else if (fileList.indexOf(memeType) !== -1) {
      return 0;
    } else if (musicList.indexOf(memeType) !== -1) {
      return 2;
    } else if (xlsFiles.indexOf(memeType) !== -1) {
      return 4;
    }
    return 1000;
  }
  codeCreator() {
    return 1234;
    const val = Math.floor(1000 + Math.random() * 8999);
    return val;
  }
  async sendSmsCode(phone, code) {
    return;
    const receptor = phone;
    const template = 'teknoverify';
    const type = 'sms';
    const apiKey =
      '4358722F302B574D6175484D4E2F7177457137696E6F483731726D54617263684657616D677136484745453D';
    const url = `https://api.kavenegar.com/v1/${apiKey}/verify/lookup.json`;

    const options = {
      url,
      method: 'POST',
      form: {
        token: code,
        receptor: receptor,
        template: template,
        type: type,
      },
    };
    const result = await smsRequest(options);
    return result;
  }
  async sendSms(phone, text) {
    return;
    const receptor = phone;
    const template = 'teknoverify';
    const type = 'sms';
    const apiKey =
      '4358722F302B574D6175484D4E2F7177457137696E6F483731726D54617263684657616D677136484745453D';
    const url = `https://api.kavenegar.com/v1/${apiKey}/verify/lookup.json`;

    const options = {
      url,
      method: 'POST',
      form: {
        token: text,
        receptor: receptor,
        template: template,
        type: type,
      },
    };
    const result = await smsRequest(options);
    return result;
  }
  securePassword(passwordLength) {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let password = '';
    for (let i = 0; i <= passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      password += chars[randomNumber];
    }
    return password;
  }
  encryptObject(object, secretKey) {
    return object;
    return CryptoJS.AES.encrypt(JSON.stringify(object), secretKey).toString();
  }
  encryptString(str, secretKey) {
    return str;
    return CryptoJS.AES.encrypt(str, secretKey).toString();
  }
  toRad(Value) {
    return (Value * Math.PI) / 180;
  }
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    lat1 = this.toRad(lat1);
    lat2 = this.toRad(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return Math.round(d);
  }
  validateMobile(mobile) {
    mobile = mobile.length <= 10 ? `0${mobile}` : mobile;
    if (
      (mobile.indexOf('+98') > -1 &&
        (mobile.length !== 13 ||
          !/^[0-9]+$/.test(mobile.substring(1, mobile.length)))) ||
      (mobile.indexOf('+98') === -1 &&
        (mobile.length !== 11 || !/^[0-9]+$/.test(mobile)))
    ) {
      return false;
    }
    if (
      (mobile.length === 13 && mobile.substring(0, 4) !== '+989') ||
      (mobile.length === 11 && mobile.substring(0, 2) !== '09')
    ) {
      return false;
    }
    mobile = mobile.replace('+989', '09');
    return mobile;
  }
}
