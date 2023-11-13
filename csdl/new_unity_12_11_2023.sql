-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 12, 2023 lúc 10:30 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `new_unity`
--

DELIMITER $$
--
-- Thủ tục
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `layChiTietPhieuNhap` (IN `in_MaPhieu` INT)   BEGIN
SELECT ctd.MaSanPham,sp.TenSanPham, ctd.SoLuong, ctd.DonVi, ctd.NgaySanXuat, ctd.NgayHetHan 
FROM phieunhap as pn join 
chitietdonyeucau as ctd on ctd.MaDon = pn.MaDon and ctd.ViTriKho = pn.MaKho JOIN 
sanpham as sp on sp.MaSanPHam = ctd.MaSanPham
WHERE MaPhieu = in_MaPhieu;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `layChiTietPhieuXuat` (IN `in_MaPhieu` INT)   BEGIN
SELECT ctpx.MaChiTietSanPham,ctsp.MaSanPham,sp.TenSanPham, ctpx.SoLuong, ctsp.DonVi, ctsp.NgaySanXuat, ctsp.NgayHetHan 
FROM phieuxuat as px join 
chitietphieuxuat as ctpx on ctpx.MaPhieu = px.MaPhieu JOIN 
chitietsanpham as ctsp on ctsp.MaChiTietSanPham = ctpx.MaChiTietSanPham JOIN
sanpham as sp on sp.MaSanPHam = ctsp.MaSanPham 
WHERE px.MaPhieu = in_MaPhieu;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `layDonYeuCauDaDuyet` ()   BEGIN
	SELECT DISTINCT d.MaDon, d.MaLoai,MaTaiKhoan, TenLoai,NgayLap, d.TrangThai,d.SoLuong as soluongnguyenlieu
FROM donyeucau as d JOIN chitietdonyeucau as ctd on ctd.MaDon = d.MaDon JOIN loaidon as ld on d.MaLoai = ld.MaLoai WHERE (d.MaLoai = 1 or d.MaLoai = 3) AND TrangThai = "Đã duyệt";
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `layDonYeuCauTheoMaDon` (IN `in_MaDon` INT)   BEGIN	
	SELECT d.MaDon, d.MaLoai,MaTaiKhoan, TenLoai,NgayLap, d.TrangThai,ctd.MaSanPham, sp.TenSanPham, ctd.SoLuong,ctd.DonVi, ctd.NgaySanXuat, ctd.NgayHetHan, ctd.ViTriKho FROM donyeucau as d JOIN chitietdonyeucau as ctd on d.MaDon = ctd.MaDon JOIN sanpham as sp on sp.MaSanPham = ctd.MaSanPham JOIN loaidon as ld on ld.MaLoai = d.MaLoai WHERE ctd.MaDon = in_MaDon;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `layDonYeuCauTheoTaiKhoan` (IN `in_MaTaiKhoan` INT)   BEGIN	
	SELECT d.MaDon, d.MaLoai,MaTaiKhoan, TenLoai,NgayLap, d.TrangThai,ctd.MaSanPham, sp.TenSanPham, ctd.SoLuong,ctd.DonVi, ctd.NgaySanXuat, ctd.NgayHetHan FROM donyeucau as d JOIN chitietdonyeucau as ctd on d.MaDon = ctd.MaDon JOIN sanpham as sp on sp.MaSanPham = ctd.MaSanPham JOIN loaidon as ld on ld.MaLoai = d.MaLoai WHERE d.MaTaiKhoan = in_MaTaiKhoan AND (d.TrangThai ="Đã nhập kho" or d.TrangThai = "Đã xuất kho" or d.TrangThai = 'Hủy');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `layDonYeuCauXuatDaDuyet` ()   BEGIN
	SELECT DISTINCT d.MaDon, d.MaLoai,MaTaiKhoan, TenLoai,NgayLap, d.TrangThai, d.soluong as soluongnguyenlieu
FROM donyeucau as d JOIN chitietdonyeucau as ctd on ctd.MaDon = d.MaDon JOIN loaidon as ld on d.MaLoai = ld.MaLoai 
WHERE (d.MaLoai = 2 or d.MaLoai = 4) AND d.TrangThai = "Đã duyệt";
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `layPhieuNhapKhoTheoKho` (IN `in_MaTaiKhoan` INT, IN `in_maKho` INT, IN `in_trangThai` VARCHAR(255))   BEGIN
	SELECT DISTINCT pn.MaPhieu,d.MaDon,pn.NgayNhap, pn.TrangThai, pn.MaKho, d.MaLoai,pn.MaTaiKhoan,pn.NgayLap,  CASE WHEN count(*) > 0 THEN COUNT(*) ELSE null END as soluongnguyenlieu, 
    CASE 
    	WHEN d.MaLoai = 1 THEN "Phiếu nhập kho nguyên liệu"
        ELSE  "Phiếu nhập kho thành phẩm"
    END as TenLoai
    FROM donyeucau as d JOIN 
    phieunhap as pn on pn.MaDon = d.MaDon join
    loaidon as ld on d.MaLoai = ld.MaLoai JOIN
    chitietdonyeucau as ctd on ctd.MaDon = d.MaDon
    WHERE  (pn.MaTaiKhoan = in_MaTaiKhoan or pn.MaKho = in_maKho)  and  pn.TrangThai = in_trangThai
    GROUP BY pn.MaPhieu,d.MaDon, d.MaLoai,pn.MaTaiKhoan,pn.NgayLap, pn.TrangThai;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `layPhieuXuatKhoTheoKho` (IN `in_MaTaiKhoan` INT, IN `in_maKho` INT, IN `in_trangThai` VARCHAR(255))   BEGIN
	SELECT DISTINCT px.MaPhieu,d.MaDon, d.MaLoai,px.MaTaiKhoan,px.NgayLap, px.TrangThai,px.NgayXuat, px.MaKho, CASE WHEN count(*) > 0 THEN COUNT(*) ELSE null END as soluongnguyenlieu, 
    CASE 
    	WHEN d.MaLoai = 2 THEN "Phiếu xuất kho nguyên liệu"
        ELSE  "Phiếu xuất kho thành phẩm"
    END as TenLoai
FROM donyeucau as d JOIN 
phieuxuat as px on px.MaDon = d.MaDon join
loaidon as ld on d.MaLoai = ld.MaLoai JOIN
chitietphieuxuat as ctpx on ctpx.MaPhieu = px.MaPhieu
WHERE (px.MaTaiKhoan = in_MaTaiKhoan or px.MaKho = in_maKho) and px.TrangThai = in_trangThai
GROUP BY px.MaPhieu,d.MaDon, d.MaLoai,px.MaTaiKhoan,px.NgayLap, px.TrangThai;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `phanQuyen` ()   BEGIN
    DECLARE i, n,v_MaVaiTro INT DEFAULT 0;
    DECLARE  v_code, v_tenBang, v_tenVaiTro VARCHAR(255);
    SET n = (SELECT COUNT(*) FROM vaitro_quyen);
    
    WHILE i < n DO
        SELECT v.MaVaiTro, q.code, b.tenBang, v.tenVaiTro
        INTO v_MaVaiTro,v_code, v_tenBang, v_tenVaiTro
        FROM vaitro_quyen as vq 
        JOIN vaitro as v ON v.MaVaiTro = vq.MaVaiTro 
        JOIN quyen as q ON q.MaQuyen = vq.MaQuyen 
        JOIN bang as b ON b.MaBang = vq.MaBang 
        LIMIT i, 1;
        
        SET @grant_query = CONCAT(
            'GRANT ', v_code, ' ON new_unity.', v_tenBang, 
            ' TO ', v_tenVaiTro, '@localhost'
        );
        
        IF v_MaVaiTro = 2 THEN
            SET @grant_query = CONCAT(@grant_query, ' WITH GRANT OPTION;');
        ELSE
            SET @grant_query = CONCAT(@grant_query, ';');
        END IF;
        
        PREPARE stmt FROM @grant_query;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
        
        SET i = i + 1;
    END WHILE;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `xacNhanNhapKho` (IN `in_maPhieu` INT)   BEGIN
    update phieunhap  as pn JOIN
	chitietdonyeucau as ctd on pn.MaDon = ctd.MaDon and pn.MaKho = ctd.ViTriKho JOIN
	sanpham as sp on sp.MaSanPHam = ctd.MaSanPham
    SET sp.SoLuongTon = ctd.SoLuong + sp.SoLuongTon, 
    sp.SoLuongChoNhap = sp.SoLuongChoNhap - ctd.SoLuong,
    pn.TrangThai = "Đã nhập kho"
    WHERE pn.MaPhieu = in_maPhieu;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `xacNhanXuatKho` (IN `in_MaPhieu` INT)   BEGIN
	DECLARE n, i, idchitiet, soluongmoi INT DEFAULT 0;
    SELECT COUNT(*) INTO n 
    FROM phieuxuat as px JOIN 
    chitietphieuxuat as ctpx on ctpx.MaPhieu = px.MaPhieu
    WHERE px.MaPhieu = in_MaPhieu;
    SET i = 0;
    WHILE  i < n DO
        SELECT SoLuong, machitietsanpham 
        INTO soluongmoi, idchitiet 
        FROM chitietphieuxuat LIMIT i, 1;
        UPDATE sanpham as sp JOIN
        chitietsanpham as ctsp on sp.MaSanPHam = ctsp.MaSanPHam JOIN
        kho as k on k.MaKho = ctsp.MaKho
        SET sp.SoLuongTon = sp.SoLuongTon - soluongmoi,
        sp.SoLuongChoXuat = sp.SoLuongChoXuat - soluongmoi,
        ctsp.SoLuongTon = ctsp.SoLuongTon - soluongmoi,
        ctsp.soluongchoxuat = ctsp.soluongchoxuat - soluongmoi,
        k.SucChuaDaDung = k.SucChuaDaDung - soluongmoi 
        WHERE ctsp.MaChiTietSanPham = idchitiet;
        SET i = i + 1;
    END WHILE;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `xemSanPhamTheoKho` (IN `in_loai` VARCHAR(255), IN `in_MaKho` INT)   BEGIN
	SELECT sp.MaSanPHam, sp.TenSanPham, ctsp.MaChiTietSanPham, ctsp.SoLuongTon, ctsp.NgaySanXuat, ctsp.NgayHetHan, ctsp.MaKho 
    FROM kho as k JOIN 
    chitietsanpham as ctsp on ctsp.MaKho = k.MaKho JOIN 
    sanpham as sp on sp.MaSanPHam = ctsp.MaSanPHam
    WHERE ctsp.MaKho = in_MaKho and sp.Loai = in_loai;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bang`
--

CREATE TABLE `bang` (
  `MaBang` int(11) NOT NULL,
  `TenBang` varchar(255) NOT NULL,
  `MoTa` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `bang`
--

INSERT INTO `bang` (`MaBang`, `TenBang`, `MoTa`) VALUES
(1, 'BienBan', 'Chứa thông tin biên bản. Bao gồm mã, đơn bị lập và lý do lập'),
(2, 'ChiTietCongThuc', 'Chứa thông tin về danh sách nguyên liệu có trong công thức'),
(3, 'ChiTietDonYeuCau', 'Bảng chứa thông tin chi tiết về đơn yêu cầu, bao gồm thông tin về danh sách sản phẩm có trong đơn, ngày sản xuất, ngày hết hạn của sản phẩm…'),
(4, 'ChiTietKiemKe', 'Chi tiết phiếu kiểm kê'),
(5, 'ChiTietPhieuXuat', 'Chi tiết về phiếu xuất kho, gồm số mã chi tiết sản phẩm và số lượng cần xuất'),
(6, 'ChiTietSanPham', 'Chứa thông tin danh sách chi tiết từng nguyên liệu trong kho.'),
(7, 'CongThuc', 'Chứa thôn tin công thức'),
(8, 'DonYeuCau', 'Bảng chứa thông tin của đơn yêu cầu.'),
(9, 'Kho', 'Thông tin về kho bao gồm mã, tên, vị trí thực tế, sức chứa, sức chứa đã dùng, loại…'),
(10, 'KiemKe', 'Thông tin về phiếu kiểm kê nguyên liệu/ thành phẩm trong kho'),
(11, 'LoaiDon', 'Bảng chứa thống tin của các loại đơn yêu cầu trong hệ thống bao gồm Mã loại, tên loại, và mô tả'),
(12, 'PhieuNhap', 'Thông tin về các phiếu nhập kho'),
(13, 'PhieuXuat', 'Thông tin về các phiếu xuất kho'),
(14, 'SanPham', 'Chứa thông tin về sản phẩm bao gồm mã, tên, số lượng tồn, số lượng chờ xuất, nhập…'),
(15, 'TaiKhoan', 'Thôn tin về tài khoản người dùng'),
(16, 'VaiTro', 'Chứa thông tin về các vai trò có trong hệ thống');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bienban`
--

CREATE TABLE `bienban` (
  `MaBienBan` int(10) NOT NULL,
  `MaDon` int(10) NOT NULL,
  `MaTaiKhoan` int(10) NOT NULL,
  `NgayLap` date NOT NULL,
  `LyDo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `bienban`
--

INSERT INTO `bienban` (`MaBienBan`, `MaDon`, `MaTaiKhoan`, `NgayLap`, `LyDo`) VALUES
(490, 568, 2, '2023-11-12', 'Thiếu đường 20KG');

--
-- Bẫy `bienban`
--
DELIMITER $$
CREATE TRIGGER `lapBienBan` AFTER INSERT ON `bienban` FOR EACH ROW BEGIN
	UPDATE donyeucau 
    SET TrangThai = "Hủy"
    WHERE MaDon = NEW.MaDon;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietcongthuc`
--

CREATE TABLE `chitietcongthuc` (
  `MaCongThuc` int(10) NOT NULL,
  `MaSanPHam` int(10) NOT NULL,
  `SoLuong` float(10,5) NOT NULL,
  `DonVi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietcongthuc`
--

INSERT INTO `chitietcongthuc` (`MaCongThuc`, `MaSanPHam`, `SoLuong`, `DonVi`) VALUES
(197, 1, 0.02000, 'KG'),
(197, 2, 1.00000, 'KG'),
(439, 1, 0.02000, 'KG'),
(439, 2, 0.02000, 'KG'),
(807, 1, 2.00000, 'KG'),
(807, 2, 2.00000, 'KG'),
(917, 1, 0.02000, 'KG'),
(917, 2, 0.03000, 'KG');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietdonyeucau`
--

CREATE TABLE `chitietdonyeucau` (
  `MaDon` int(10) NOT NULL,
  `MaSanPham` int(10) NOT NULL,
  `SoLuong` float(10,5) NOT NULL,
  `DonVi` varchar(255) NOT NULL,
  `NgaySanXuat` date DEFAULT NULL,
  `NgayHetHan` date DEFAULT NULL,
  `ViTriKho` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietdonyeucau`
--

INSERT INTO `chitietdonyeucau` (`MaDon`, `MaSanPham`, `SoLuong`, `DonVi`, `NgaySanXuat`, `NgayHetHan`, `ViTriKho`) VALUES
(357, 756, 10.00000, 'KG', '2023-11-09', '2023-11-17', 1),
(357, 956, 10.00000, 'KG', '2023-11-09', '2023-11-17', 3),
(408, 1, 2.00000, 'KG', NULL, NULL, NULL),
(408, 2, 3.00000, 'KG', NULL, NULL, NULL),
(568, 1, 200.00000, 'KG', NULL, NULL, NULL),
(568, 2, 200.00000, 'KG', NULL, NULL, NULL),
(600, 1, 10.00000, 'KG', NULL, NULL, NULL),
(600, 2, 10.00000, 'KG', NULL, NULL, NULL),
(633, 277, 2.00000, 'KG', NULL, NULL, NULL),
(633, 956, 2.00000, 'KG', NULL, NULL, NULL),
(695, 1, 10.00000, 'KG', '2023-11-10', '2023-11-16', 1),
(695, 2, 10.00000, 'KG', '2023-11-10', '2023-11-16', 1),
(695, 277, 10.00000, 'KG', '2023-11-10', '2023-11-18', 3),
(846, 1, 2.00000, 'KG', NULL, NULL, NULL),
(846, 2, 2.00000, 'KG', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietkiemke`
--

CREATE TABLE `chitietkiemke` (
  `MaKiemKe` int(10) NOT NULL,
  `MaChiTietSanPham` int(10) NOT NULL,
  `TinhTrang` int(255) NOT NULL,
  `SoLuong` int(11) NOT NULL,
  `MoTa` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietkiemke`
--

INSERT INTO `chitietkiemke` (`MaKiemKe`, `MaChiTietSanPham`, `TinhTrang`, `SoLuong`, `MoTa`) VALUES
(59, 256, 0, 5, 'Thiếu so với thực tế'),
(432, 8, 0, 5, 'Thiếu so với thực tế'),
(432, 860, 0, 5, 'Thiếu so với thực tế'),
(526, 572, 0, 5, 'Thiếu so với thực tế');

--
-- Bẫy `chitietkiemke`
--
DELIMITER $$
CREATE TRIGGER `themChiTietKiemKE` AFTER INSERT ON `chitietkiemke` FOR EACH ROW BEGIN
	UPDATE chitietsanpham as ctsp JOIN
    sanpham as sp on sp.MaSanPham = ctsp.MaSanPHam JOIN
    kho as k on k.MaKho = ctsp.MaKho
    SET ctsp.tinhTrang = 1,
    sp.SoLuongChoXuat = sp.SoLuongChoXuat - new.SoLuong,
    ctsp.soLuongChoXuat = ctsp.soLuongChoXuat + new.SoLuong
    WHERE ctsp.MaChiTietSanPham = new.MaChiTietSanPham;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietphieuxuat`
--

CREATE TABLE `chitietphieuxuat` (
  `MaPhieu` int(10) NOT NULL,
  `MaChiTietSanPham` int(10) NOT NULL,
  `SoLuong` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietphieuxuat`
--

INSERT INTO `chitietphieuxuat` (`MaPhieu`, `MaChiTietSanPham`, `SoLuong`) VALUES
(341, 572, 2),
(341, 623, 2),
(943, 8, 2),
(943, 256, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietsanpham`
--

CREATE TABLE `chitietsanpham` (
  `MaChiTietSanPham` int(10) NOT NULL,
  `MaSanPHam` int(10) NOT NULL,
  `MaPhieuNhap` int(11) NOT NULL,
  `MaKho` int(10) NOT NULL,
  `SoLuongTon` float(10,5) NOT NULL,
  `Donvi` varchar(255) NOT NULL,
  `Gia` int(11) NOT NULL,
  `NgaySanXuat` date NOT NULL,
  `NgayHetHan` date NOT NULL,
  `soLuongChoXuat` float(10,5) NOT NULL,
  `tinhTrang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietsanpham`
--

INSERT INTO `chitietsanpham` (`MaChiTietSanPham`, `MaSanPHam`, `MaPhieuNhap`, `MaKho`, `SoLuongTon`, `Donvi`, `Gia`, `NgaySanXuat`, `NgayHetHan`, `soLuongChoXuat`, `tinhTrang`) VALUES
(8, 1, 199, 1, 5.00000, 'KG', 20000, '2023-11-10', '2023-11-16', 2.00000, 1),
(256, 2, 199, 1, 5.00000, 'KG', 20000, '2023-11-10', '2023-11-16', 2.00000, 1),
(572, 277, 537, 3, 8.00000, 'KG', 20000, '2023-11-10', '2023-11-18', 5.00000, 1),
(623, 956, 403, 3, 8.00000, 'KG', 20000, '2023-11-09', '2023-11-17', 0.00000, 0),
(860, 756, 179, 1, 5.00000, 'KG', 20000, '2023-11-09', '2023-11-17', 0.00000, 1);

--
-- Bẫy `chitietsanpham`
--
DELIMITER $$
CREATE TRIGGER `tangSoLuongDaDungKho` BEFORE INSERT ON `chitietsanpham` FOR EACH ROW BEGIN
		UPDATE kho 
        SET SucChuaDaDung = SucChuaDaDung + NEW.SoLuongTon
        WHERE kho.MaKho = New.MaKho;
    END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `congthuc`
--

CREATE TABLE `congthuc` (
  `MaCongThuc` int(10) NOT NULL,
  `TenCongThuc` varchar(255) NOT NULL,
  `MoTa` varchar(255) NOT NULL,
  `SoLuongNguyenLieu` int(10) NOT NULL,
  `trangThai` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `congthuc`
--

INSERT INTO `congthuc` (`MaCongThuc`, `TenCongThuc`, `MoTa`, `SoLuongNguyenLieu`, `trangThai`) VALUES
(197, 'Bánh hạt dẻ', 'Bánh được làm từ hạt dẻ thơm lừng', 2, 1),
(439, 'Bánh nhân đậu xanh', 'Bánh được làm từ đậu xanh thơm ngon béo ngậy', 2, 1),
(807, 'Bánh dừa', 'Bánh là từ sơ dừa', 2, 1),
(917, 'Bánh đậu nành', 'Bánh được làm từ đậu nành', 2, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `donyeucau`
--

CREATE TABLE `donyeucau` (
  `MaDon` int(10) NOT NULL,
  `MaLoai` int(10) NOT NULL,
  `MaTaiKhoan` int(10) NOT NULL,
  `NgayLap` date NOT NULL,
  `SoLuong` int(10) NOT NULL,
  `TrangThai` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `donyeucau`
--

INSERT INTO `donyeucau` (`MaDon`, `MaLoai`, `MaTaiKhoan`, `NgayLap`, `SoLuong`, `TrangThai`) VALUES
(357, 1, 892, '2023-11-11', 2, 'Đã nhập kho'),
(408, 1, 892, '2023-11-11', 2, 'Đã duyệt'),
(568, 1, 892, '2023-11-11', 2, 'Lập biên bản'),
(600, 1, 892, '2023-11-12', 2, 'Đã duyệt'),
(633, 2, 350, '2023-11-12', 2, 'Đã phân phối'),
(695, 1, 892, '2023-11-11', 3, 'Đã nhập kho'),
(846, 2, 350, '2023-11-12', 2, 'Đã xuất kho');

--
-- Bẫy `donyeucau`
--
DELIMITER $$
CREATE TRIGGER `chanCapNhatDon` BEFORE UPDATE ON `donyeucau` FOR EACH ROW BEGIN
	DECLARE new_trangthai varchar(255);
    SELECT TrangThai into new_trangthai FROM donyeucau WHERE MaDon = New.MaDon;
    if new_trangthai = "Đã hủy" THEN
    	SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Đơn yêu cầu đã bị hủy không thể cập nhật!';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `kho`
--

CREATE TABLE `kho` (
  `MaKho` int(10) NOT NULL,
  `TenKho` varchar(255) NOT NULL,
  `ViTri` varchar(255) NOT NULL,
  `MoTa` varchar(255) NOT NULL,
  `SucChua` int(10) NOT NULL,
  `SucChuaDaDung` int(10) NOT NULL,
  `Loai` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `kho`
--

INSERT INTO `kho` (`MaKho`, `TenKho`, `ViTri`, `MoTa`, `SucChua`, `SucChuaDaDung`, `Loai`) VALUES
(1, 'Kho nguyên liệu 10', 'Số 6 Lê lợi', 'Kho dùng để chứa nguyên liệu', 10000, 20, 'Nguyên liệu'),
(2, 'Kho thành phẩm 1', 'Số 7 lê lợi', 'Kho dùng để chứa thành phẩm', 10000, 0, 'Thành phẩm'),
(3, 'Kho nguyên liệu 2', 'Số 7 lê lơi', '', 10000, 16, 'Nguyên liệu'),
(431, 'Kho nguyên liệu 3', 'Số 6 lê lơi', 'Kho dùng để chứa nguyên liệu 3', 10000, 0, 'Nguyên liệu đã hủy');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `kiemke`
--

CREATE TABLE `kiemke` (
  `MaKiemKe` int(10) NOT NULL,
  `MaTaiKhoan` int(11) NOT NULL,
  `NgayLap` date NOT NULL,
  `TinhTrang` int(255) NOT NULL,
  `Kho` int(11) NOT NULL,
  `Loai` int(11) NOT NULL,
  `MoTa` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `kiemke`
--

INSERT INTO `kiemke` (`MaKiemKe`, `MaTaiKhoan`, `NgayLap`, `TinhTrang`, `Kho`, `Loai`, `MoTa`) VALUES
(59, 12, '2023-11-11', 5, 1, 2, '2,756'),
(432, 12, '2023-11-11', 5, 1, 1, ''),
(526, 12, '2023-11-11', 4, 3, 1, ''),
(956, 12, '2023-11-11', 1, 1, 1, '');

--
-- Bẫy `kiemke`
--
DELIMITER $$
CREATE TRIGGER `capNhatTieuHuyKiemKe` BEFORE UPDATE ON `kiemke` FOR EACH ROW BEGIN
	if new.TinhTrang = 5 THEN
    	UPDATE  sanpham as sp JOIN chitietsanpham as ctsp on ctsp.MaSanPHam = sp.MaSanPham JOIN kho as k on k.MaKho = ctsp.MaKho JOIN chitietkiemke as ctkk on ctkk.MaChiTietSanPham = ctsp.MaChiTietSanPham 
        SET sp.SoLuongTon = sp.SoLuongTon - ctkk.SoLuong ,
        sp.SoLuongChoXuat = sp.SoLuongChoXuat - ctkk.SoLuong,
        ctsp.SoLuongTon = ctsp.SoLuongTon - ctkk.SoLuong,
        ctsp.soLuongChoXuat = ctsp.soLuongChoXuat - ctkk.SoLuong, 
        k.SucChuaDaDung = k.SucChuaDaDung - ctkk.SoLuong
   		WHERE ctkk.MaKiemKe = new.MaKiemKe;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaidon`
--

CREATE TABLE `loaidon` (
  `MaLoai` int(10) NOT NULL,
  `TenLoai` varchar(255) NOT NULL,
  `MoTa` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `loaidon`
--

INSERT INTO `loaidon` (`MaLoai`, `TenLoai`, `MoTa`) VALUES
(1, 'Đơn yêu cầu nhập kho nguyên liệu', 'Phiếu nhập kho nguyên vật liệu do ban giám đốc yêu cầu'),
(2, 'Đơn yêu cầu xuất kho nguyên liệu', 'Phiếu xuất kho nguyên liệu do bộ phận sản xuất yêu cầu'),
(3, 'Đơn yêu cầu nhập thành phẩm', 'Đơn do bên bộ phận sản xuất yêu cầu nhập thành phẩm đã hoàn tất vào kho'),
(4, 'Đơn yêu cầu xuất thành phẩm', 'Đơn do bộ phận bán hàng lập yêu cầu xuất thành phẩm để bán hàng');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieunhap`
--

CREATE TABLE `phieunhap` (
  `MaPhieu` int(10) NOT NULL,
  `MaDon` int(10) NOT NULL,
  `MaKho` int(10) NOT NULL,
  `MaTaiKhoan` int(10) NOT NULL,
  `NgayLap` date NOT NULL,
  `NgayNhap` date DEFAULT NULL,
  `TrangThai` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `phieunhap`
--

INSERT INTO `phieunhap` (`MaPhieu`, `MaDon`, `MaKho`, `MaTaiKhoan`, `NgayLap`, `NgayNhap`, `TrangThai`) VALUES
(179, 357, 1, 2, '2023-11-11', '2023-11-11', 'Đã nhập kho'),
(199, 695, 1, 2, '2023-11-11', '2023-11-11', 'Đã nhập kho'),
(403, 357, 3, 2, '2023-11-11', '2023-11-11', 'Đã nhập kho'),
(537, 695, 3, 2, '2023-11-11', '2023-11-11', 'Đã nhập kho');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieuxuat`
--

CREATE TABLE `phieuxuat` (
  `MaPhieu` int(10) NOT NULL,
  `MaDon` int(10) NOT NULL,
  `MaTaiKhoan` int(10) NOT NULL,
  `TrangThai` varchar(255) NOT NULL,
  `NgayLap` date DEFAULT NULL,
  `NgayXuat` date DEFAULT NULL,
  `MaKho` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `phieuxuat`
--

INSERT INTO `phieuxuat` (`MaPhieu`, `MaDon`, `MaTaiKhoan`, `TrangThai`, `NgayLap`, `NgayXuat`, `MaKho`) VALUES
(341, 633, 2, 'Chờ xuất', '2023-11-12', NULL, 3),
(943, 846, 2, 'Đã xuất', '2023-11-12', '2023-11-12', 1);

--
-- Bẫy `phieuxuat`
--
DELIMITER $$
CREATE TRIGGER `xuatKho` AFTER UPDATE ON `phieuxuat` FOR EACH ROW BEGIN
	IF new.TrangThai = "Đã xuất" THEN
    	CALL xacNhanXuatKho(new.MaPhieu);
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `quyen`
--

CREATE TABLE `quyen` (
  `MaQuyen` int(11) NOT NULL,
  `TenQuyen` varchar(255) NOT NULL,
  `Code` varchar(50) NOT NULL,
  `MoTa` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `quyen`
--

INSERT INTO `quyen` (`MaQuyen`, `TenQuyen`, `Code`, `MoTa`) VALUES
(1, 'Xem dữ liệu', 'SELECT', 'quyền được xem dữ liệu'),
(2, 'Cập nhật dữ liệu', 'UPDATE', 'quyền được cập nhật dữ liệu'),
(3, 'Xóa dữ liệu', 'DELETE', 'quyền được xóa dữ liệu'),
(4, 'Thêm dữ liệu', 'INSERT', 'quyền được thêm dữ liệu');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

CREATE TABLE `sanpham` (
  `MaSanPham` int(10) NOT NULL,
  `TenSanPham` varchar(255) NOT NULL,
  `SoLuongTon` int(10) NOT NULL,
  `DonVi` varchar(255) NOT NULL,
  `SoLuongChoNhap` int(10) NOT NULL,
  `SoLuongChoXuat` int(10) NOT NULL,
  `Loai` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`MaSanPham`, `TenSanPham`, `SoLuongTon`, `DonVi`, `SoLuongChoNhap`, `SoLuongChoXuat`, `Loai`) VALUES
(1, 'Bột mì sửa', 5, 'KG', 0, 2, 'Nguyên liệu'),
(2, 'Đường', 5, 'KG', 0, 2, 'Nguyên liệu'),
(3, 'Bánh gạo sửa', 0, 'Cái', 0, 0, 'Thành phẩm'),
(4, 'Bánh đậu xanh', 0, 'Cái', 0, 0, 'Thành phẩm'),
(277, 'Hạnh nhân', 8, 'KG', 0, 0, 'Nguyên liệu'),
(330, 'Hạt dẻ', 0, 'KG', 0, 0, 'Nguyên liệu'),
(421, 'Đậu xanh', 0, 'KG', 0, 0, 'Nguyên liệu'),
(453, 'Bánh hạt dẻ', 0, 'KG', 0, 0, 'Thành phẩm'),
(476, 'Bột mì', 0, 'KG', 0, 0, 'Nguyên liệu'),
(756, 'Dừa', 5, 'KG', 0, 0, 'Nguyên liệu'),
(930, 'Bánh đậu xanh', 0, 'KG', 0, 0, 'Thành phẩm'),
(956, 'Hạt điều', 8, 'KG', 0, 0, 'Nguyên liệu');

-- --------------------------------------------------------

--
-- Cấu trúc đóng vai cho view `sanphamhethang`
-- (See below for the actual view)
--
CREATE TABLE `sanphamhethang` (
`MaSanPHam` int(10)
,`TenSanPham` varchar(255)
,`SoLuongTon` int(10)
,`DonVi` varchar(255)
,`SoLuongChoNhap` int(10)
,`SoLuongChoXuat` int(10)
,`Loai` varchar(255)
);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taikhoan`
--

CREATE TABLE `taikhoan` (
  `MaTaiKhoan` int(10) NOT NULL,
  `MaVaiTro` int(10) NOT NULL,
  `TenDangNhap` varchar(255) NOT NULL,
  `MatKhau` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `taikhoan`
--

INSERT INTO `taikhoan` (`MaTaiKhoan`, `MaVaiTro`, `TenDangNhap`, `MatKhau`) VALUES
(1, 1, 'GD001', 'GD_001'),
(2, 2, '20113401', 'password123'),
(4, 3, '20113403', 'password123'),
(12, 6, '20113406', 'password123'),
(350, 4, '20113405', 'password123'),
(892, 1, '20113402', 'password123');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vaitro`
--

CREATE TABLE `vaitro` (
  `MaVaiTro` int(10) NOT NULL,
  `TenVaiTro` varchar(255) NOT NULL,
  `MoTa` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `vaitro`
--

INSERT INTO `vaitro` (`MaVaiTro`, `TenVaiTro`, `MoTa`) VALUES
(1, 'GiamDoc', 'Người dùng có vai trò giám đốc'),
(2, 'QuanLyKho', 'Quản lý kho'),
(3, 'NhanVienKho', 'Bộ phận sản xuất'),
(4, 'BoPhanSanXuat', 'Bộ phận sản xuất'),
(5, 'BoPhanBanHang', 'Bộ phận bán hàng'),
(6, 'BoPhanKiemKe', 'Bộ phận chịu trách nhiệm kiểm kê kho');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vaitro_quyen`
--

CREATE TABLE `vaitro_quyen` (
  `MaVaiTro` int(11) NOT NULL,
  `MaQuyen` int(11) NOT NULL,
  `MaBang` int(11) NOT NULL,
  `GrantOption` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `vaitro_quyen`
--

INSERT INTO `vaitro_quyen` (`MaVaiTro`, `MaQuyen`, `MaBang`, `GrantOption`) VALUES
(1, 1, 1, 0),
(1, 1, 2, 0),
(1, 1, 3, 0),
(1, 1, 4, 0),
(1, 1, 5, 0),
(1, 1, 6, 0),
(1, 1, 7, 0),
(1, 1, 8, 0),
(1, 1, 9, 0),
(1, 1, 10, 0),
(1, 1, 11, 0),
(1, 1, 12, 0),
(1, 1, 13, 0),
(1, 1, 14, 0),
(1, 1, 15, 0),
(1, 1, 16, 1),
(1, 2, 2, 0),
(1, 2, 6, 0),
(1, 2, 7, 0),
(1, 2, 8, 0),
(1, 2, 9, 0),
(1, 2, 10, 0),
(1, 2, 14, 0),
(1, 2, 15, 0),
(1, 4, 2, 0),
(1, 4, 3, 0),
(1, 4, 6, 0),
(1, 4, 7, 0),
(1, 4, 8, 0),
(1, 4, 9, 0),
(2, 1, 1, 1),
(2, 1, 2, 1),
(2, 1, 3, 1),
(2, 1, 4, 1),
(2, 1, 5, 1),
(2, 1, 6, 1),
(2, 1, 7, 1),
(2, 1, 8, 1),
(2, 1, 9, 1),
(2, 1, 10, 1),
(2, 1, 11, 1),
(2, 1, 12, 1),
(2, 1, 13, 1),
(2, 1, 14, 1),
(2, 1, 15, 1),
(2, 1, 16, 1),
(2, 2, 3, 1),
(2, 2, 5, 1),
(2, 2, 6, 1),
(2, 2, 8, 1),
(2, 2, 9, 1),
(2, 2, 12, 1),
(2, 2, 13, 1),
(2, 2, 14, 1),
(2, 2, 15, 1),
(2, 2, 16, 1),
(2, 4, 1, 1),
(2, 4, 5, 1),
(2, 4, 9, 1),
(2, 4, 12, 1),
(2, 4, 13, 1),
(2, 4, 14, 1),
(2, 4, 15, 1),
(3, 1, 1, 0),
(3, 1, 2, 0),
(3, 1, 3, 0),
(3, 1, 4, 0),
(3, 1, 5, 0),
(3, 1, 6, 0),
(3, 1, 7, 0),
(3, 1, 8, 0),
(3, 1, 9, 0),
(3, 1, 10, 0),
(3, 1, 11, 0),
(3, 1, 12, 0),
(3, 1, 13, 0),
(3, 1, 14, 0),
(3, 1, 15, 0),
(3, 1, 16, 1),
(3, 2, 6, 0),
(3, 2, 12, 0),
(3, 2, 13, 0),
(3, 2, 14, 0),
(3, 2, 15, 0),
(3, 4, 6, 0),
(4, 1, 1, 0),
(4, 1, 2, 0),
(4, 1, 3, 0),
(4, 1, 6, 0),
(4, 1, 7, 0),
(4, 1, 8, 0),
(4, 1, 9, 0),
(4, 1, 11, 0),
(4, 1, 14, 0),
(4, 1, 15, 0),
(4, 1, 16, 1),
(4, 2, 15, 0),
(4, 4, 3, 0),
(4, 4, 8, 0),
(5, 1, 1, 0),
(5, 1, 3, 0),
(5, 1, 4, 0),
(5, 1, 6, 0),
(5, 1, 8, 0),
(5, 1, 9, 0),
(5, 1, 10, 0),
(5, 1, 11, 0),
(5, 1, 14, 0),
(5, 1, 15, 0),
(5, 1, 16, 1),
(5, 2, 15, 0),
(5, 4, 3, 0),
(5, 4, 8, 0),
(6, 1, 1, 0),
(6, 1, 2, 0),
(6, 1, 3, 0),
(6, 1, 4, 0),
(6, 1, 5, 0),
(6, 1, 6, 0),
(6, 1, 7, 0),
(6, 1, 8, 0),
(6, 1, 9, 0),
(6, 1, 10, 0),
(6, 1, 11, 0),
(6, 1, 12, 0),
(6, 1, 13, 0),
(6, 1, 14, 0),
(6, 1, 15, 0),
(6, 1, 16, 1),
(6, 2, 4, 0),
(6, 2, 6, 0),
(6, 2, 8, 0),
(6, 2, 10, 0),
(6, 2, 12, 0),
(6, 2, 13, 0),
(6, 2, 15, 0),
(6, 4, 1, 0),
(6, 4, 4, 0),
(6, 4, 10, 0);

-- --------------------------------------------------------

--
-- Cấu trúc đóng vai cho view `vnguyenlieu`
-- (See below for the actual view)
--
CREATE TABLE `vnguyenlieu` (
`MaSanPHam` int(10)
,`TenSanPham` varchar(255)
,`SoLuongTon` int(10)
,`DonVi` varchar(255)
,`SoLuongChoNhap` int(10)
,`SoLuongChoXuat` int(10)
,`Loai` varchar(255)
);

-- --------------------------------------------------------

--
-- Cấu trúc đóng vai cho view `vthanhpham`
-- (See below for the actual view)
--
CREATE TABLE `vthanhpham` (
`MaSanPHam` int(10)
,`TenSanPham` varchar(255)
,`SoLuongTon` int(10)
,`DonVi` varchar(255)
,`SoLuongChoNhap` int(10)
,`SoLuongChoXuat` int(10)
,`Loai` varchar(255)
);

-- --------------------------------------------------------

--
-- Cấu trúc cho view `sanphamhethang`
--
DROP TABLE IF EXISTS `sanphamhethang`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `sanphamhethang`  AS SELECT `sanpham`.`MaSanPham` AS `MaSanPHam`, `sanpham`.`TenSanPham` AS `TenSanPham`, `sanpham`.`SoLuongTon` AS `SoLuongTon`, `sanpham`.`DonVi` AS `DonVi`, `sanpham`.`SoLuongChoNhap` AS `SoLuongChoNhap`, `sanpham`.`SoLuongChoXuat` AS `SoLuongChoXuat`, `sanpham`.`Loai` AS `Loai` FROM `sanpham` WHERE `sanpham`.`SoLuongTon` = 0 ;

-- --------------------------------------------------------

--
-- Cấu trúc cho view `vnguyenlieu`
--
DROP TABLE IF EXISTS `vnguyenlieu`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vnguyenlieu`  AS SELECT `sanpham`.`MaSanPham` AS `MaSanPHam`, `sanpham`.`TenSanPham` AS `TenSanPham`, `sanpham`.`SoLuongTon` AS `SoLuongTon`, `sanpham`.`DonVi` AS `DonVi`, `sanpham`.`SoLuongChoNhap` AS `SoLuongChoNhap`, `sanpham`.`SoLuongChoXuat` AS `SoLuongChoXuat`, `sanpham`.`Loai` AS `Loai` FROM `sanpham` WHERE `sanpham`.`Loai` = 'Nguyên liệu' ;

-- --------------------------------------------------------

--
-- Cấu trúc cho view `vthanhpham`
--
DROP TABLE IF EXISTS `vthanhpham`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vthanhpham`  AS SELECT `sanpham`.`MaSanPham` AS `MaSanPHam`, `sanpham`.`TenSanPham` AS `TenSanPham`, `sanpham`.`SoLuongTon` AS `SoLuongTon`, `sanpham`.`DonVi` AS `DonVi`, `sanpham`.`SoLuongChoNhap` AS `SoLuongChoNhap`, `sanpham`.`SoLuongChoXuat` AS `SoLuongChoXuat`, `sanpham`.`Loai` AS `Loai` FROM `sanpham` WHERE `sanpham`.`Loai` = 'Thành phẩm\'Thành phẩm' ;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bang`
--
ALTER TABLE `bang`
  ADD PRIMARY KEY (`MaBang`);

--
-- Chỉ mục cho bảng `bienban`
--
ALTER TABLE `bienban`
  ADD PRIMARY KEY (`MaBienBan`),
  ADD KEY `FKBienBan267512` (`MaDon`),
  ADD KEY `FKBienBan556856` (`MaTaiKhoan`);

--
-- Chỉ mục cho bảng `chitietcongthuc`
--
ALTER TABLE `chitietcongthuc`
  ADD PRIMARY KEY (`MaCongThuc`,`MaSanPHam`),
  ADD KEY `FKChiTietCon75882` (`MaCongThuc`),
  ADD KEY `FKChiTietCon401115` (`MaSanPHam`);

--
-- Chỉ mục cho bảng `chitietdonyeucau`
--
ALTER TABLE `chitietdonyeucau`
  ADD PRIMARY KEY (`MaDon`,`MaSanPham`),
  ADD KEY `FKChiTietDon673597` (`MaSanPham`),
  ADD KEY `FKChiTietDon910533` (`MaDon`);

--
-- Chỉ mục cho bảng `chitietkiemke`
--
ALTER TABLE `chitietkiemke`
  ADD PRIMARY KEY (`MaKiemKe`,`MaChiTietSanPham`),
  ADD KEY `FKChiTietKie686394` (`MaChiTietSanPham`),
  ADD KEY `FKChiTietKie166234` (`MaKiemKe`);

--
-- Chỉ mục cho bảng `chitietphieuxuat`
--
ALTER TABLE `chitietphieuxuat`
  ADD PRIMARY KEY (`MaPhieu`,`MaChiTietSanPham`),
  ADD KEY `FKChiTietPhi963262` (`MaChiTietSanPham`),
  ADD KEY `FKChiTietPhi455447` (`MaPhieu`);

--
-- Chỉ mục cho bảng `chitietsanpham`
--
ALTER TABLE `chitietsanpham`
  ADD PRIMARY KEY (`MaChiTietSanPham`),
  ADD KEY `FKChiTietSan492747` (`MaKho`),
  ADD KEY `FKChiTietSan276671` (`MaSanPHam`),
  ADD KEY `MaPhieuNhap` (`MaPhieuNhap`);

--
-- Chỉ mục cho bảng `congthuc`
--
ALTER TABLE `congthuc`
  ADD PRIMARY KEY (`MaCongThuc`);

--
-- Chỉ mục cho bảng `donyeucau`
--
ALTER TABLE `donyeucau`
  ADD PRIMARY KEY (`MaDon`),
  ADD KEY `FKDonYeuCau371336` (`MaLoai`),
  ADD KEY `FKDonYeuCau246617` (`MaTaiKhoan`);

--
-- Chỉ mục cho bảng `kho`
--
ALTER TABLE `kho`
  ADD PRIMARY KEY (`MaKho`);

--
-- Chỉ mục cho bảng `kiemke`
--
ALTER TABLE `kiemke`
  ADD PRIMARY KEY (`MaKiemKe`),
  ADD KEY `Kho` (`Kho`),
  ADD KEY `MaTaiKhoan` (`MaTaiKhoan`);

--
-- Chỉ mục cho bảng `loaidon`
--
ALTER TABLE `loaidon`
  ADD PRIMARY KEY (`MaLoai`);

--
-- Chỉ mục cho bảng `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD PRIMARY KEY (`MaPhieu`),
  ADD KEY `FKPhieuNhap984722` (`MaTaiKhoan`),
  ADD KEY `FKPhieuNhap162499` (`MaDon`),
  ADD KEY `MaKho` (`MaKho`);

--
-- Chỉ mục cho bảng `phieuxuat`
--
ALTER TABLE `phieuxuat`
  ADD PRIMARY KEY (`MaPhieu`),
  ADD KEY `FKPhieuXuat472906` (`MaDon`),
  ADD KEY `FKPhieuXuat674315` (`MaTaiKhoan`),
  ADD KEY `phieuxuat_ibfk_1` (`MaKho`);

--
-- Chỉ mục cho bảng `quyen`
--
ALTER TABLE `quyen`
  ADD PRIMARY KEY (`MaQuyen`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`MaSanPham`);
ALTER TABLE `sanpham` ADD FULLTEXT KEY `Loai` (`Loai`);

--
-- Chỉ mục cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`MaTaiKhoan`),
  ADD KEY `FKTaiKhoan752758` (`MaVaiTro`);

--
-- Chỉ mục cho bảng `vaitro`
--
ALTER TABLE `vaitro`
  ADD PRIMARY KEY (`MaVaiTro`);

--
-- Chỉ mục cho bảng `vaitro_quyen`
--
ALTER TABLE `vaitro_quyen`
  ADD PRIMARY KEY (`MaVaiTro`,`MaQuyen`,`MaBang`),
  ADD KEY `MaQuyen` (`MaQuyen`),
  ADD KEY `MaBang` (`MaBang`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bang`
--
ALTER TABLE `bang`
  MODIFY `MaBang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `bienban`
--
ALTER TABLE `bienban`
  MODIFY `MaBienBan` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=491;

--
-- AUTO_INCREMENT cho bảng `chitietsanpham`
--
ALTER TABLE `chitietsanpham`
  MODIFY `MaChiTietSanPham` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=955;

--
-- AUTO_INCREMENT cho bảng `congthuc`
--
ALTER TABLE `congthuc`
  MODIFY `MaCongThuc` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=918;

--
-- AUTO_INCREMENT cho bảng `kho`
--
ALTER TABLE `kho`
  MODIFY `MaKho` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=432;

--
-- AUTO_INCREMENT cho bảng `kiemke`
--
ALTER TABLE `kiemke`
  MODIFY `MaKiemKe` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=957;

--
-- AUTO_INCREMENT cho bảng `loaidon`
--
ALTER TABLE `loaidon`
  MODIFY `MaLoai` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `phieunhap`
--
ALTER TABLE `phieunhap`
  MODIFY `MaPhieu` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=997;

--
-- AUTO_INCREMENT cho bảng `phieuxuat`
--
ALTER TABLE `phieuxuat`
  MODIFY `MaPhieu` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=944;

--
-- AUTO_INCREMENT cho bảng `quyen`
--
ALTER TABLE `quyen`
  MODIFY `MaQuyen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `MaSanPham` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=957;

--
-- AUTO_INCREMENT cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `MaTaiKhoan` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=893;

--
-- AUTO_INCREMENT cho bảng `vaitro`
--
ALTER TABLE `vaitro`
  MODIFY `MaVaiTro` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bienban`
--
ALTER TABLE `bienban`
  ADD CONSTRAINT `FKBienBan267512` FOREIGN KEY (`MaDon`) REFERENCES `donyeucau` (`MaDon`),
  ADD CONSTRAINT `FKBienBan556856` FOREIGN KEY (`MaTaiKhoan`) REFERENCES `taikhoan` (`MaTaiKhoan`);

--
-- Các ràng buộc cho bảng `chitietcongthuc`
--
ALTER TABLE `chitietcongthuc`
  ADD CONSTRAINT `FKChiTietCon401115` FOREIGN KEY (`MaSanPHam`) REFERENCES `sanpham` (`MaSanPHam`),
  ADD CONSTRAINT `FKChiTietCon75882` FOREIGN KEY (`MaCongTHuc`) REFERENCES `congthuc` (`MaCongTHuc`);

--
-- Các ràng buộc cho bảng `chitietdonyeucau`
--
ALTER TABLE `chitietdonyeucau`
  ADD CONSTRAINT `FKChiTietDon673597` FOREIGN KEY (`MaSanPham`) REFERENCES `sanpham` (`MaSanPHam`),
  ADD CONSTRAINT `FKChiTietDon910533` FOREIGN KEY (`MaDon`) REFERENCES `donyeucau` (`MaDon`);

--
-- Các ràng buộc cho bảng `chitietkiemke`
--
ALTER TABLE `chitietkiemke`
  ADD CONSTRAINT `FKChiTietKie166234` FOREIGN KEY (`MaKiemKe`) REFERENCES `kiemke` (`MaKiemKe`),
  ADD CONSTRAINT `FKChiTietKie686394` FOREIGN KEY (`MaChiTietSanPham`) REFERENCES `chitietsanpham` (`MaChiTietSanPham`);

--
-- Các ràng buộc cho bảng `chitietphieuxuat`
--
ALTER TABLE `chitietphieuxuat`
  ADD CONSTRAINT `FKChiTietPhi455447` FOREIGN KEY (`MaPhieu`) REFERENCES `phieuxuat` (`MaPhieu`),
  ADD CONSTRAINT `FKChiTietPhi963262` FOREIGN KEY (`MaChiTietSanPham`) REFERENCES `chitietsanpham` (`MaChiTietSanPham`);

--
-- Các ràng buộc cho bảng `chitietsanpham`
--
ALTER TABLE `chitietsanpham`
  ADD CONSTRAINT `FKChiTietSan276671` FOREIGN KEY (`MaSanPHam`) REFERENCES `sanpham` (`MaSanPHam`),
  ADD CONSTRAINT `FKChiTietSan492747` FOREIGN KEY (`MaKho`) REFERENCES `kho` (`MaKho`),
  ADD CONSTRAINT `chitietsanpham_ibfk_1` FOREIGN KEY (`MaPhieuNhap`) REFERENCES `phieunhap` (`MaPhieu`);

--
-- Các ràng buộc cho bảng `donyeucau`
--
ALTER TABLE `donyeucau`
  ADD CONSTRAINT `FKDonYeuCau246617` FOREIGN KEY (`MaTaiKhoan`) REFERENCES `taikhoan` (`MaTaiKhoan`),
  ADD CONSTRAINT `FKDonYeuCau371336` FOREIGN KEY (`MaLoai`) REFERENCES `loaidon` (`MaLoai`);

--
-- Các ràng buộc cho bảng `kiemke`
--
ALTER TABLE `kiemke`
  ADD CONSTRAINT `kiemke_ibfk_1` FOREIGN KEY (`Kho`) REFERENCES `kho` (`MaKho`),
  ADD CONSTRAINT `kiemke_ibfk_2` FOREIGN KEY (`MaTaiKhoan`) REFERENCES `taikhoan` (`MaTaiKhoan`);

--
-- Các ràng buộc cho bảng `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD CONSTRAINT `FKPhieuNhap162499` FOREIGN KEY (`MaDon`) REFERENCES `donyeucau` (`MaDon`),
  ADD CONSTRAINT `FKPhieuNhap984722` FOREIGN KEY (`MaTaiKhoan`) REFERENCES `taikhoan` (`MaTaiKhoan`),
  ADD CONSTRAINT `phieunhap_ibfk_1` FOREIGN KEY (`MaKho`) REFERENCES `kho` (`MaKho`);

--
-- Các ràng buộc cho bảng `phieuxuat`
--
ALTER TABLE `phieuxuat`
  ADD CONSTRAINT `FKPhieuXuat472906` FOREIGN KEY (`MaDon`) REFERENCES `donyeucau` (`MaDon`),
  ADD CONSTRAINT `FKPhieuXuat674315` FOREIGN KEY (`MaTaiKhoan`) REFERENCES `taikhoan` (`MaTaiKhoan`),
  ADD CONSTRAINT `phieuxuat_ibfk_1` FOREIGN KEY (`MaKho`) REFERENCES `kho` (`MaKho`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD CONSTRAINT `FKTaiKhoan752758` FOREIGN KEY (`MaVaiTro`) REFERENCES `vaitro` (`MaVaiTro`);

--
-- Các ràng buộc cho bảng `vaitro_quyen`
--
ALTER TABLE `vaitro_quyen`
  ADD CONSTRAINT `vaitro_quyen_ibfk_1` FOREIGN KEY (`MaVaiTro`) REFERENCES `vaitro` (`MaVaiTro`),
  ADD CONSTRAINT `vaitro_quyen_ibfk_2` FOREIGN KEY (`MaQuyen`) REFERENCES `quyen` (`MaQuyen`),
  ADD CONSTRAINT `vaitro_quyen_ibfk_3` FOREIGN KEY (`MaBang`) REFERENCES `bang` (`MaBang`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
