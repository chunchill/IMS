window.IMS = window.IMS || {};
IMS.staticData = (function () {
    var carTypes = ['中大型车','中型车','小型车','紧凑型车','豪华车','跑车','SUV','MPV'];
    var provinceAbbreviation = ['津', '京', '沪', '渝', '冀', '豫', '云', '辽', '黑', '湘', '皖', '鲁', '新', '苏', '浙', '赣', '鄂', '桂', '甘', '晋', '蒙', '陕', '吉', '闽', '贵', '粤', '青', '藏', '川', '宁', '琼'];

    return {
            carTypes: carTypes,
            provinceAbbreviation:provinceAbbreviation
    };
})();