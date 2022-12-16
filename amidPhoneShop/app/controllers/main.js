import ProducesServices from "../services/ProduceServices.js";
import Produce from "../models/Produce.js";
import Validation from "../models/validation.js";

const produceService = new ProducesServices();
const validation = new Validation();
const getEl = id => document.getElementById(id);

const getListProduces = () => {
    produceService
        .callAPI(`ProductCapstone`, "GET", null)
        .then(result => renderHTML(result.data))
        .catch((err) => console.log(err))
}
getListProduces();
const renderHTML = dataList => {
    
    const result = dataList.reduce((content, produce, index) => {
        return content +=`
        <tr>
        <td scope="row">${index + 1}</td>
        <td class="product-name">${produce.name}</td>
        <td class="product-price">${produce.price}$</td>
        <td class="product-image"><img width="50px" src="${produce.img}" /></td>
        <td>${produce.desc}</td>
        <td>
          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button type="button" class="btn btn-primary"  id="update-btn" 
                data-toggle="modal"
                data-target="#myModal"
                onclick="btnEdit('${produce.id}')">Edit</button>
            <button type="button" class="btn btn-danger" onclick="btnDelete('${produce.id}')">Delete</button>
          </div> 
        </td>
      </tr>
        `
    }, "");
    getEl("tblDanhSachSanPham").innerHTML = result;
}
const getValueIput = (isAdd) => {
    const idProduce = getEl("idProduce").value;
    const NameProduce = getEl("NameProduce").value;
    const typeProduce = getEl("typeProduce").value;
    const backCameraProduce = getEl("backCameraProduce").value;
    const frontCameraProduce = getEl("frontCameraProduce").value;
    const screenProduce = getEl("screenProduce").value;
    const PriceProduce = getEl("PriceProduce").value;
    const imgProduce = getEl("imgProduce").value;
    const descProduce = getEl("descProduce").value;

    let isFlag = true;
    if (isAdd) {
        isFlag &= validation.valicationCheck(NameProduce, "tbNameSP", "(*)Vui lòng nhập thông tin")
        isFlag &= validation.selectionCheck("typeProduce","tbLoaiSP","(*)Vui lòng chọn sản phẩm")
        isFlag &= validation.valicationCheck(backCameraProduce, "tbBackCamera", "(*)Vui lòng nhập thông tin")
        isFlag &= validation.valicationCheck(frontCameraProduce, "tbfrontCamera", "(*)Vui lòng nhập thông tin")
        isFlag &= validation.valicationCheck(screenProduce, "tbScreen", "(*)Vui lòng nhập thông tin")
        isFlag &= validation.valicationCheck(PriceProduce, "tbPrice", "(*)Vui lòng nhập thông tin")
        isFlag &= validation.valicationCheck(imgProduce, "tbImg", "(*)Vui lòng nhập thông tin")
        isFlag &= validation.valicationCheck(descProduce, "tbDesc", "(*)Vui lòng nhập thông tin")
    }
    if (!isFlag) {
        return null;
    }
    const prouduce = new Produce(
        idProduce,
        NameProduce,
        typeProduce,
        PriceProduce,
        descProduce,
        imgProduce,
        screenProduce,
        backCameraProduce,
        frontCameraProduce);
    
    return prouduce;
}

getEl("btnThemSanPham").addEventListener("click", () => {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm sản phẩm"
    getEl("btnCapNhat").style.display = "none";
    getEl("btnThemMon").style.display = "block";
})

getEl("btnThemMon").onclick = () => {
    const produce = getValueIput(true);
    if (produce != null) {
        produceService
            .callAPI(`ProductCapstone`, "POST", produce)
            .then(result => {
                getListProduces();
                document.getElementsByClassName("close")[0].click();
            })
            .catch(err => console.log(err))
    }
}

const btnEdit = id => {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa sản phẩm"
    getEl("btnCapNhat").style.display = "block";
    getEl("btnThemMon").style.display = "none";
    produceService
        .callAPI(`ProductCapstone/${id}`, "GET", null)
        .then(result => {
            const produce = result.data;
            getEl("idProduce").value = produce.id;
            getEl("NameProduce").value = produce.name;
            getEl("typeProduce").value = produce.type;
            getEl("backCameraProduce").value = produce.backCamera;
            getEl("frontCameraProduce").value = produce.frontCamera;
            getEl("screenProduce").value = produce.screen;
            getEl("PriceProduce").value = produce.price;
            getEl("imgProduce").value = produce.img;
            getEl("descProduce").value = produce.desc;
        })
        .catch(err=>console.log(err))
}

window.btnEdit = btnEdit;

const btnDelete = id => {
    produceService
        .callAPI(`ProductCapstone/${id}`, "DELETE", null)
        .then(result => getListProduces() )
        .catch(err => console.log(err))
}

getEl("btnCapNhat").addEventListener("click", () => {
    const produce = getValueIput(true);
    if (produce != null) {
        produceService
            .callAPI(`ProductCapstone/${produce.id}`, "PUT", produce)
            .then(result => {
                getListProduces();
                document.getElementsByClassName("close")[0].click();
            })
            .catch(err => console.log(err))
    }
})

window.btnDelete = btnDelete