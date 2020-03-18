
			function Product(ProductId, nameProduct, TieuChuan, soLuong, XuatXu,Kho,ThanhTien){
				this.ProductId =ProductId;
				this.nameProduct =nameProduct;
				this.TieuChuan =TieuChuan;
				// this.ProductId =ProductId;
				this.soLuong =soLuong;
				this.XuatXu =XuatXu;
				this.Kho =Kho;
				this.ThanhTien =ThanhTien;
				this.getProductId = function(){
					return this.ProductId;
				}

				
				this.show = function(){
					document.getElementById("stt").innerHTML= this.ProductId ;
					document.getElementById("name").innerHTML= this.nameProduct ;
					document.getElementById("TieuChuan").innerHTML= this.TieuChuan ;
					document.getElementById("soLuong").innerHTML= this.soLuong ;
					document.getElementById("XuatXu").innerHTML= this.XuatXu ;
					document.getElementById("Kho").innerHTML= this.Kho ;
					document.getElementById("ThanhTien").innerHTML= this.ThanhTien ;
				}
			}
			let ProductList = new Array();
			let arrTenHangHoa = [1,"Cherry Úc","TKNL",15,"Úc","Kho Hà Đông,Hà Nội","150.000"];

			function intProductlist(){
				for(let i =0 ; i< arrTenHangHoa.length; i++)
				{
					let ProductId = arrTenHangHoa[0];
					let nameProduct = arrTenHangHoa[1];
					let TieuChuan =  arrTenHangHoa[2];
					let soLuong = arrTenHangHoa[3];
					let XuatXu =arrTenHangHoa[4];
					let Kho = arrTenHangHoa[5];
					let ThanhTien = arrTenHangHoa[6];
					let sp = new Product(ProductId,nameProduct,TieuChuan,soLuong,XuatXu,Kho,ThanhTien);
					
					ProductList[i] = sp;
				}
			}
			function showProduct(){
				for( let i = 0; i<5 ; i++)
					ProductList[i].show();
			}
			function sortProductList(){
				ProductList.sort(function(sv1,sv2){
					return sv1.getAverageScore() - sv2.getAverageScore();
				})
			}


			function main(){
				intProductlist();
				showProduct();
				sortProductList();
			}
			main();

			// -----------------------------------------------------
			function showForm(){
            document.getElementById("myForm").style.display = "block";
            document.getElementById("my_table").style.display = "none";

        }
        function closeForm(){
            document.getElementById("myForm").style.display = "none";
            document.getElementById("my_table").style.display = "block";

        }