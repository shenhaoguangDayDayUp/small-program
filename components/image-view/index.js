/** 封装imageView控件 */
import {BaseURL} from '../../utils/request';

Component({
  
  properties: {
    width: {
      type: String,
      default: '0',
    },
    height: {
      type: String,
      default: '0',
    },
    src: {
      type: String,
      default: '',
      observer: function (newValue, oldValue) {
        let imageSrc = newValue;
        if (!imageSrc) {
          return;
        }
        if (!imageSrc.startsWith("http")) {
          imageSrc = `${BaseURL}${imageSrc}`;
        }
        this.setData({
          imageSrc: imageSrc,
        });
      }
    },
    tag: {
      type: [Number, String],
      default: '',
    },
    url:{
      type:[String],
      default:"",
      observer: function (newValue, oldValue) {
        console.log(newValue)
        this.setData({
          imageSrc: newValue,
        });
      }
    }
  },

  data: {
    imageSrc: '',
    hasLoaded: false,
  },

  methods: {
    _onImgTap: function(e){
      this.triggerEvent('imgtap', {
        tag: this.data.tag,
        src: this.data.src,
        fullPath: this.data.imageSrc,
      });
    },
    _onImgLoad: function(e){
      
      this.triggerEvent('imgload', {
        tag: this.data.tag,
        src: this.data.src,
        fullPath: this.data.imageSrc,
        width: e.detail.width,
        height: e.detail.height,
      });
      this.setData({
        hasLoaded: true,
      });
    },
    _onImgError: function(e){
      this.setData({
        imageSrc: '/images/fav_fileicon_pic90.png',
        hasLoaded: true,
      });
    }
  },
  attached: function(){
    let imageSrc = this.data.src;
    if (!imageSrc){
      return;
    }
    if (!imageSrc.startsWith("http")) {
      imageSrc = `${BaseURL}${imageSrc}`;
    }
    this.setData({
      imageSrc: imageSrc,
    });
  },

})
