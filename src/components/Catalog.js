// components/Catalog.js
import React, { useState, useEffect } from 'react';
import './Catalog.css';

const Catalog = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Array of catalog images
  const catalogImages = [
    'https://i.postimg.cc/bvyxZ26r/Gemini-Generated-Image-dzjo45dzjo45dzjo.png',
    'https://i.postimg.cc/T3vkXTbq/TRIONE-MORTISE-CATALOGUE-2025-(C)-01.jpg',
    'https://i.postimg.cc/dVcWKJCG/TRIONE-MORTISE-CATALOGUE-2025-(C)-02.jpg',
    'https://i.postimg.cc/3xQLH3GF/TRIONE-MORTISE-CATALOGUE-2025-(C)-03.jpg',
    'https://i.postimg.cc/x1VsS9m5/TRIONE-MORTISE-CATALOGUE-2025-(C)-04.jpg',
    'https://i.postimg.cc/pLQsW3QC/TRIONE-MORTISE-CATALOGUE-2025-(C)-05.jpg',
    'https://i.postimg.cc/rw2hLq4g/TRIONE-MORTISE-CATALOGUE-2025-(C)-06.jpg',
    'https://i.postimg.cc/XYKsjtKz/TRIONE-MORTISE-CATALOGUE-2025-(C)-07.jpg',
    'https://i.postimg.cc/kgNTJLNz/TRIONE-MORTISE-CATALOGUE-2025-(C)-08.jpg',
    'https://i.postimg.cc/FHbTrwbM/TRIONE-MORTISE-CATALOGUE-2025-(C)-09.jpg',
    'https://i.postimg.cc/zGwxz4SY/TRIONE-MORTISE-CATALOGUE-2025-(C)-10.jpg',
    'https://i.postimg.cc/FHbTrwg5/TRIONE-MORTISE-CATALOGUE-2025-(C)-11.jpg',
    'https://i.postimg.cc/XYKsjtc3/TRIONE-MORTISE-CATALOGUE-2025-(C)-12.jpg',
    'https://i.postimg.cc/7LxmfXXp/TRIONE-MORTISE-CATALOGUE-2025-(C)-13.jpg',
    'https://i.postimg.cc/xd0tcggw/TRIONE-MORTISE-CATALOGUE-2025-(C)-14.jpg',
    'https://i.postimg.cc/nLH0CT0x/TRIONE-MORTISE-CATALOGUE-2025-(C)-15.jpg',
    'https://i.postimg.cc/25z2VT2D/TRIONE-MORTISE-CATALOGUE-2025-(C)-16.jpg',
    'https://i.postimg.cc/43JBmwBX/TRIONE-MORTISE-CATALOGUE-2025-(C)-17.jpg',
    'https://i.postimg.cc/Dz2B85B2/TRIONE-MORTISE-CATALOGUE-2025-(C)-18.jpg',
    'https://i.postimg.cc/wB607F0T/TRIONE-MORTISE-CATALOGUE-2025-(C)-19.jpg',
    'https://i.postimg.cc/tgX2YD24/TRIONE-MORTISE-CATALOGUE-2025-(C)-20.jpg',
    'https://i.postimg.cc/5txn6pn0/TRIONE-MORTISE-CATALOGUE-2025-(C)-21.jpg',
    'https://i.postimg.cc/mrb8tV8k/TRIONE-MORTISE-CATALOGUE-2025-(C)-22.jpg',
    'https://i.postimg.cc/jjsZLvZC/TRIONE-MORTISE-CATALOGUE-2025-(C)-23.jpg',
    'https://i.postimg.cc/nLH0CT0C/TRIONE-MORTISE-CATALOGUE-2025-(C)-24.jpg',
    'https://i.postimg.cc/pd2qpkqm/TRIONE-MORTISE-CATALOGUE-2025-(C)-25.jpg',
    'https://i.postimg.cc/k5nfBwfR/TRIONE-MORTISE-CATALOGUE-2025-(C)-26.jpg',
    'https://i.postimg.cc/g0YNn4NR/TRIONE-MORTISE-CATALOGUE-2025-(C)-27.jpg',
    'https://i.postimg.cc/KYZJRQJn/TRIONE-MORTISE-CATALOGUE-2025-(C)-28.jpg',
    'https://i.postimg.cc/hGpMxx5f/TRIONE-MORTISE-CATALOGUE-2025-(C)-29.jpg',
    'https://i.postimg.cc/HLB355hJ/TRIONE-MORTISE-CATALOGUE-2025-(C)-30.jpg',
    'https://i.postimg.cc/zf0pWWcy/TRIONE-MORTISE-CATALOGUE-2025-(C)-31.jpg',
    'https://i.postimg.cc/7LmX77WJ/TRIONE-MORTISE-CATALOGUE-2025-(C)-32.jpg',
    'https://i.postimg.cc/hGpMxx57/TRIONE-MORTISE-CATALOGUE-2025-(C)-33.jpg',
    'https://i.postimg.cc/cJXTYYbn/TRIONE-MORTISE-CATALOGUE-2025-(C)-34.jpg',
    'https://i.postimg.cc/bv3LbbBb/TRIONE-MORTISE-CATALOGUE-2025-(C)-35.jpg',
    'https://i.postimg.cc/fbB5XXrY/TRIONE-MORTISE-CATALOGUE-2025-(C)-36.jpg',
    'https://i.postimg.cc/W4XSrrHm/TRIONE-MORTISE-CATALOGUE-2025-(C)-37.jpg',
    'https://i.postimg.cc/nL0T77PY/TRIONE-MORTISE-CATALOGUE-2025-(C)-38.jpg',
    'https://i.postimg.cc/5tnpvvRS/TRIONE-MORTISE-CATALOGUE-2025-(C)-39.jpg',
    'https://i.postimg.cc/R0XGffDR/TRIONE-MORTISE-CATALOGUE-2025-(C)-40.jpg',
    'https://i.postimg.cc/BvMNDDVp/TRIONE-MORTISE-CATALOGUE-2025-(C)-41.jpg',
    'https://i.postimg.cc/nL0T77PT/TRIONE-MORTISE-CATALOGUE-2025-(C)-42.jpg',
    'https://i.postimg.cc/8CtwWW0Z/TRIONE-MORTISE-CATALOGUE-2025-(C)-43.jpg',
    'https://i.postimg.cc/wB0FJJG4/TRIONE-MORTISE-CATALOGUE-2025-(C)-44.jpg',
    'https://i.postimg.cc/vm3X99NP/TRIONE-MORTISE-CATALOGUE-2025-(C)-45.jpg',
    'https://i.postimg.cc/VND4MMVH/TRIONE-MORTISE-CATALOGUE-2025-(C)-46.jpg',
    'https://i.postimg.cc/43BwttSM/TRIONE-MORTISE-CATALOGUE-2025-(C)-47.jpg',
    'https://i.postimg.cc/k5fw88pz/TRIONE-MORTISE-CATALOGUE-2025-(C)-48.jpg',
    'https://i.postimg.cc/zBv7kBsp/TRIONE-MORTISE-CATALOGUE-2025-(C)-49.jpg',
    'https://i.postimg.cc/yNvn99b2/TRIONE-MORTISE-CATALOGUE-2025-(C)-50.jpg',
    'https://i.postimg.cc/0ydG5CCD/Gemini-Generated-Image-s94zjss94zjss94z.png',
    'https://i.postimg.cc/PfbV4MM7/HEXELO-MORTICE-PDF-00.png',
'https://i.postimg.cc/vHQqS6qH/HEXELO-MORTICE-PDF-01.png',
'https://i.postimg.cc/7YxsQTsZ/HEXELO-MORTICE-PDF-02.png',
'https://i.postimg.cc/RVMsbnsS/HEXELO-MORTICE-PDF-03.png',
'https://i.postimg.cc/NjFNQvvr/HEXELO-MORTICE-PDF-04.png',
'https://i.postimg.cc/6pqHBxxr/HEXELO-MORTICE-PDF-05.png',
'https://i.postimg.cc/Dw0C7331/HEXELO-MORTICE-PDF-06.png',
'https://i.postimg.cc/K8j9mhhn/HEXELO-MORTICE-PDF-07.png',
'https://i.postimg.cc/y8xf7CCh/HEXELO-MORTICE-PDF-08.png',
'https://i.postimg.cc/k4mF6kzY/HELEXO-CATALOG-00.png',
'https://i.postimg.cc/Hxg4cfFD/HELEXO-CATALOG-01.png',
'https://i.postimg.cc/Y9HfGJZs/HELEXO-CATALOG-02.png',
'https://i.postimg.cc/W3v6FQxc/HELEXO-CATALOG-03.png',
'https://i.postimg.cc/d1YmkzgF/HELEXO-CATALOG-04.png',
'https://i.postimg.cc/j5bQwGBd/HELEXO-CATALOG-05.png',
'https://i.postimg.cc/FR4gd2wH/HELEXO-CATALOG-06.png',
'https://i.postimg.cc/76n1gKyk/HELEXO-CATALOG-07.png',
'https://i.postimg.cc/Jn53bpW8/HELEXO-CATALOG-08.png',
'https://i.postimg.cc/3RFjgtHR/HELEXO-CATALOG-09.png',
'https://i.postimg.cc/Hx90Q6C0/HELEXO-CATALOG-10.png',
'https://i.postimg.cc/XqhrF5XV/HELEXO-CATALOG-100.png',
'https://i.postimg.cc/tJfsP67P/HELEXO-CATALOG-101.png',
'https://i.postimg.cc/8c37WvsB/HELEXO-CATALOG-102.png',
'https://i.postimg.cc/RCb62kGv/HELEXO-CATALOG-103.png',
'https://i.postimg.cc/pXhhvs1W/HELEXO-CATALOG-104.png',
'https://i.postimg.cc/gkXXpgBv/HELEXO-CATALOG-105.png',
'https://i.postimg.cc/yYggKLrn/HELEXO-CATALOG-106.png',
'https://i.postimg.cc/ZKG956GS/HELEXO-CATALOG-107.png',
'https://i.postimg.cc/mg7Pzt4D/HELEXO-CATALOG-108.png',
'https://i.postimg.cc/9fVrGCX0/HELEXO-CATALOG-109.png',
'https://i.postimg.cc/wvQ5hwdX/HELEXO-CATALOG-11.png',
'https://i.postimg.cc/vmMcWb84/HELEXO-CATALOG-110.png',
'https://i.postimg.cc/1zPfpsRg/HELEXO-CATALOG-111.png',
'https://i.postimg.cc/yNBkFs6c/HELEXO-CATALOG-112.png',
'https://i.postimg.cc/1zPfpsR7/HELEXO-CATALOG-113.png',
'https://i.postimg.cc/Xv3pw4NP/HELEXO-CATALOG-114.png',
'https://i.postimg.cc/0NfrnFrn/HELEXO-CATALOG-115.png',
'https://i.postimg.cc/Xv8XLmXH/HELEXO-CATALOG-116.png',
'https://i.postimg.cc/7LVb9dbj/HELEXO-CATALOG-117.png',
'https://i.postimg.cc/9fpzbKzv/HELEXO-CATALOG-118.png',
'https://i.postimg.cc/BvgtpkX9/HELEXO-CATALOG-119.png',
'https://i.postimg.cc/sxfYK5Vp/HELEXO-CATALOG-12.png',
'https://i.postimg.cc/7LVb9dfk/HELEXO-CATALOG-120.png',
'https://i.postimg.cc/rpJzj3Kq/HELEXO-CATALOG-121.png',
'https://i.postimg.cc/sXgxNmhz/HELEXO-CATALOG-122.png',
'https://i.postimg.cc/63pqmcvw/HELEXO-CATALOG-123.png',
'https://i.postimg.cc/FRHzBpL7/HELEXO-CATALOG-124.png',
'https://i.postimg.cc/zB2vZhCc/HELEXO-CATALOG-125.png',
'https://i.postimg.cc/sXHxdWYc/HELEXO-CATALOG-126.png',
'https://i.postimg.cc/3RfN5GX6/HELEXO-CATALOG-127.png',
'https://i.postimg.cc/C1r5T8GX/HELEXO-CATALOG-128.png',
'https://i.postimg.cc/vT1BQmhk/HELEXO-CATALOG-129.png',
'https://i.postimg.cc/qqBsQ2kG/HELEXO-CATALOG-13.png',
'https://i.postimg.cc/KjdY4ys3/HELEXO-CATALOG-130.png',
'https://i.postimg.cc/WzQ4tPfh/HELEXO-CATALOG-131.png',
'https://i.postimg.cc/D0tzmKYW/HELEXO-CATALOG-132.png',
'https://i.postimg.cc/qq97gdZc/HELEXO-CATALOG-133.png',
'https://i.postimg.cc/cCVJ6N5D/HELEXO-CATALOG-134.png',
'https://i.postimg.cc/053jVp2P/HELEXO-CATALOG-135.png',
'https://i.postimg.cc/wxPMwhTx/HELEXO-CATALOG-136.png',
'https://i.postimg.cc/c1jCFQ4t/HELEXO-CATALOG-137.png',
'https://i.postimg.cc/gc5jgvk8/HELEXO-CATALOG-138.png',
'https://i.postimg.cc/wxPMwhTN/HELEXO-CATALOG-139.png',
'https://i.postimg.cc/Y0268QpP/HELEXO-CATALOG-14.png',
'https://i.postimg.cc/Wbk3Chht/HELEXO-CATALOG-140.png',
'https://i.postimg.cc/MKQTNvvV/HELEXO-CATALOG-141.png',
'https://i.postimg.cc/MKQTNvv3/HELEXO-CATALOG-142.png',
'https://i.postimg.cc/Gmn2CdD0/HELEXO-CATALOG-143.png',
'https://i.postimg.cc/52W0VbzJ/HELEXO-CATALOG-144.png',
'https://i.postimg.cc/L8FXp2PR/HELEXO-CATALOG-145.png',
'https://i.postimg.cc/qvHRT4KB/HELEXO-CATALOG-146.png',
'https://i.postimg.cc/9QPfXKPV/HELEXO-CATALOG-147.png',
'https://i.postimg.cc/Jz3h7v3t/HELEXO-CATALOG-148.png',
'https://i.postimg.cc/R0XVKtDz/HELEXO-CATALOG-149.png',
'https://i.postimg.cc/kGjxHD4Y/HELEXO-CATALOG-15.png',
'https://i.postimg.cc/43BNVcSX/HELEXO-CATALOG-150.png',
'https://i.postimg.cc/KYJvBTH3/HELEXO-CATALOG-151.png',
'https://i.postimg.cc/fLyWKbGy/HELEXO-CATALOG-152.png',
'https://i.postimg.cc/k4GMc50W/HELEXO-CATALOG-153.png',
'https://i.postimg.cc/k4GMc50K/HELEXO-CATALOG-154.png',
'https://i.postimg.cc/4dy453D1/HELEXO-CATALOG-155.png',
'https://i.postimg.cc/85YpnSG0/HELEXO-CATALOG-156.png',
'https://i.postimg.cc/xCZfF2QW/HELEXO-CATALOG-157.png',
'https://i.postimg.cc/MTL6rSwC/HELEXO-CATALOG-158.png',
'https://i.postimg.cc/LXW90pR2/HELEXO-CATALOG-159.png',
'https://i.postimg.cc/nrdvWMzR/HELEXO-CATALOG-16.png',
'https://i.postimg.cc/d3TqbxtV/HELEXO-CATALOG-160.png',
'https://i.postimg.cc/RhnMkDVS/HELEXO-CATALOG-161.png',
'https://i.postimg.cc/T1WRz4Y1/HELEXO-CATALOG-162.png',
'https://i.postimg.cc/FzJ9MBs1/HELEXO-CATALOG-163.png',
'https://i.postimg.cc/x8b0w4TJ/HELEXO-CATALOG-164.png',
'https://i.postimg.cc/fy0wGrTY/HELEXO-CATALOG-165.png',
'https://i.postimg.cc/z3ZJ8FVv/HELEXO-CATALOG-166.png',
'https://i.postimg.cc/t7QXpNY7/HELEXO-CATALOG-167.png',
'https://i.postimg.cc/grFYmHnn/HELEXO-CATALOG-168.png',
'https://i.postimg.cc/CdTFSszR/HELEXO-CATALOG-169.png',
'https://i.postimg.cc/Kj9nW4zW/HELEXO-CATALOG-17.png',
'https://i.postimg.cc/44wby252/HELEXO-CATALOG-18.png',
'https://i.postimg.cc/nVTYrSkw/HELEXO-CATALOG-19.png',
'https://i.postimg.cc/Df5d0pgt/HELEXO-CATALOG-20.png',
'https://i.postimg.cc/dQnm3N6c/HELEXO-CATALOG-21.png',
'https://i.postimg.cc/zXBwgwt9/HELEXO-CATALOG-22.png',
'https://i.postimg.cc/RVF1H1p5/HELEXO-CATALOG-23.png',
'https://i.postimg.cc/FsRbLbCY/HELEXO-CATALOG-24.png',
'https://i.postimg.cc/VL69C9ZS/HELEXO-CATALOG-25.png',
'https://i.postimg.cc/8P0RBFx5/HELEXO-CATALOG-26.png',
'https://i.postimg.cc/CLQGHZ9d/HELEXO-CATALOG-27.png',
'https://i.postimg.cc/dtx2m7gm/HELEXO-CATALOG-28.png',
'https://i.postimg.cc/5NRBqHDm/HELEXO-CATALOG-29.png',
'https://i.postimg.cc/VNjX8KvK/HELEXO-CATALOG-30.png',
'https://i.postimg.cc/KYnt20jQ/HELEXO-CATALOG-31.png',
'https://i.postimg.cc/zfnTrxv2/HELEXO-CATALOG-32.png',
'https://i.postimg.cc/jjzybM2k/HELEXO-CATALOG-33.png',
'https://i.postimg.cc/DZnLy149/HELEXO-CATALOG-34.png',
'https://i.postimg.cc/4dsVNphx/HELEXO-CATALOG-35.png',
'https://i.postimg.cc/NMBmfRr5/HELEXO-CATALOG-36.png',
'https://i.postimg.cc/d1wrtGTD/HELEXO-CATALOG-37.png',
'https://i.postimg.cc/9MbT4zGX/HELEXO-CATALOG-38.png',
'https://i.postimg.cc/tJg6Fy5D/HELEXO-CATALOG-39.png',
'https://i.postimg.cc/yxNR0BPL/HELEXO-CATALOG-40.png',
'https://i.postimg.cc/prdjKxZ6/HELEXO-CATALOG-41.png',
'https://i.postimg.cc/7hLzSD9D/HELEXO-CATALOG-42.png',
'https://i.postimg.cc/D0YXgDpT/HELEXO-CATALOG-43.png',
'https://i.postimg.cc/2yXZwJ9Y/HELEXO-CATALOG-44.png',
'https://i.postimg.cc/T1HD9SNG/HELEXO-CATALOG-45.png',
'https://i.postimg.cc/sx0hc8Hf/HELEXO-CATALOG-46.png',
'https://i.postimg.cc/C56qNtrf/HELEXO-CATALOG-47.png',
'https://i.postimg.cc/CMvkSBh7/HELEXO-CATALOG-48.png',
'https://i.postimg.cc/y6fcsg1v/HELEXO-CATALOG-49.png',
'https://i.postimg.cc/WzfknKYr/HELEXO-CATALOG-50.png',
'https://i.postimg.cc/sfn7sQjN/HELEXO-CATALOG-51.png',
'https://i.postimg.cc/gcM8mXzf/HELEXO-CATALOG-52.png',
'https://i.postimg.cc/XN2d4GNj/HELEXO-CATALOG-53.png',
'https://i.postimg.cc/gcM8mXcc/HELEXO-CATALOG-54.png',
'https://i.postimg.cc/X7pFJjX0/HELEXO-CATALOG-55.png',
'https://i.postimg.cc/ncC7zFMZ/HELEXO-CATALOG-56.png',
'https://i.postimg.cc/02bmQkrr/HELEXO-CATALOG-57.png',
'https://i.postimg.cc/m2tMDLht/HELEXO-CATALOG-58.png',
'https://i.postimg.cc/Fs7cRr1L/HELEXO-CATALOG-59.png',
'https://i.postimg.cc/J4GJnrtj/HELEXO-CATALOG-60.png',
'https://i.postimg.cc/KvwT36gg/HELEXO-CATALOG-61.png',
'https://i.postimg.cc/TYFb5zWn/HELEXO-CATALOG-62.png',
'https://i.postimg.cc/c423tp8B/HELEXO-CATALOG-63.png',
'https://i.postimg.cc/Pr9Dvg8y/HELEXO-CATALOG-64.png',
'https://i.postimg.cc/ncgm9yQP/HELEXO-CATALOG-65.png',
'https://i.postimg.cc/2SWZQ04M/HELEXO-CATALOG-66.png',
'https://i.postimg.cc/BnFKTmx7/HELEXO-CATALOG-67.png',
'https://i.postimg.cc/vZnVr0Wq/HELEXO-CATALOG-68.png',
'https://i.postimg.cc/6pZvrMdF/HELEXO-CATALOG-69.png',
'https://i.postimg.cc/qvK3s1sH/HELEXO-CATALOG-70.png',
'https://i.postimg.cc/qvK3s1s0/HELEXO-CATALOG-71.png',
'https://i.postimg.cc/jSf7HMHC/HELEXO-CATALOG-72.png',
'https://i.postimg.cc/nhmD434r/HELEXO-CATALOG-73.png',
'https://i.postimg.cc/L8P1txtg/HELEXO-CATALOG-74.png',
'https://i.postimg.cc/BvG1M2pn/HELEXO-CATALOG-75.png',
'https://i.postimg.cc/5tMFn8gQ/HELEXO-CATALOG-76.png',
'https://i.postimg.cc/YSwmbQRF/HELEXO-CATALOG-77.png',
'https://i.postimg.cc/hGq7pVs8/HELEXO-CATALOG-78.png',
'https://i.postimg.cc/VNcbDXgW/HELEXO-CATALOG-79.png',
'https://i.postimg.cc/vmd635h3/HELEXO-CATALOG-80.png',
'https://i.postimg.cc/k5FRZDYN/HELEXO-CATALOG-81.png',
'https://i.postimg.cc/yNX35WpT/HELEXO-CATALOG-82.png',
'https://i.postimg.cc/yNX35Wpj/HELEXO-CATALOG-83.png',
'https://i.postimg.cc/MGbf4X39/HELEXO-CATALOG-84.png',
'https://i.postimg.cc/cJMtj6k5/HELEXO-CATALOG-85.png',
'https://i.postimg.cc/xdyN7qpZ/HELEXO-CATALOG-86.png',
'https://i.postimg.cc/9ftwSzgs/HELEXO-CATALOG-87.png',
'https://i.postimg.cc/CKHntd6V/HELEXO-CATALOG-88.png',
'https://i.postimg.cc/76HJyDjj/HELEXO-CATALOG-89.png',
'https://i.postimg.cc/fLzShZ6n/HELEXO-CATALOG-90.png',
'https://i.postimg.cc/Qt8KrsRX/HELEXO-CATALOG-91.png',
'https://i.postimg.cc/Y9rLwkJ2/HELEXO-CATALOG-92.png',
'https://i.postimg.cc/W3NqPjQD/HELEXO-CATALOG-93.png',
'https://i.postimg.cc/sXjGRytZ/HELEXO-CATALOG-94.png',
'https://i.postimg.cc/Y9dGrZHQ/HELEXO-CATALOG-95.png',
'https://i.postimg.cc/4dW7fqg2/HELEXO-CATALOG-96.png',
'https://i.postimg.cc/qqgtzwJ5/HELEXO-CATALOG-97.png',
'https://i.postimg.cc/2y3qVGjp/HELEXO-CATALOG-98.png',
'https://i.postimg.cc/cC6Krh1L/HELEXO-CATALOG-99.png',
'https://i.postimg.cc/XqhrF5XV/HELEXO-CATALOG-100.png',
'https://i.postimg.cc/tJfsP67P/HELEXO-CATALOG-101.png',
'https://i.postimg.cc/8c37WvsB/HELEXO-CATALOG-102.png',
'https://i.postimg.cc/RCb62kGv/HELEXO-CATALOG-103.png',
'https://i.postimg.cc/pXhhvs1W/HELEXO-CATALOG-104.png',
'https://i.postimg.cc/gkXXpgBv/HELEXO-CATALOG-105.png',
'https://i.postimg.cc/yYggKLrn/HELEXO-CATALOG-106.png',
'https://i.postimg.cc/ZKG956GS/HELEXO-CATALOG-107.png',
'https://i.postimg.cc/mg7Pzt4D/HELEXO-CATALOG-108.png',
'https://i.postimg.cc/9fVrGCX0/HELEXO-CATALOG-109.png',
'https://i.postimg.cc/vmMcWb84/HELEXO-CATALOG-110.png',
'https://i.postimg.cc/1zPfpsRg/HELEXO-CATALOG-111.png',
'https://i.postimg.cc/yNBkFs6c/HELEXO-CATALOG-112.png',
'https://i.postimg.cc/1zPfpsR7/HELEXO-CATALOG-113.png',
'https://i.postimg.cc/Xv3pw4NP/HELEXO-CATALOG-114.png',
'https://i.postimg.cc/0NfrnFrn/HELEXO-CATALOG-115.png',
'https://i.postimg.cc/Xv8XLmXH/HELEXO-CATALOG-116.png',
'https://i.postimg.cc/7LVb9dbj/HELEXO-CATALOG-117.png',
'https://i.postimg.cc/9fpzbKzv/HELEXO-CATALOG-118.png',
'https://i.postimg.cc/BvgtpkX9/HELEXO-CATALOG-119.png',
'https://i.postimg.cc/7LVb9dfk/HELEXO-CATALOG-120.png',
'https://i.postimg.cc/rpJzj3Kq/HELEXO-CATALOG-121.png',
'https://i.postimg.cc/sXgxNmhz/HELEXO-CATALOG-122.png',
'https://i.postimg.cc/63pqmcvw/HELEXO-CATALOG-123.png',
'https://i.postimg.cc/FRHzBpL7/HELEXO-CATALOG-124.png',
'https://i.postimg.cc/zB2vZhCc/HELEXO-CATALOG-125.png',
'https://i.postimg.cc/sXHxdWYc/HELEXO-CATALOG-126.png',
'https://i.postimg.cc/3RfN5GX6/HELEXO-CATALOG-127.png',
'https://i.postimg.cc/C1r5T8GX/HELEXO-CATALOG-128.png',
'https://i.postimg.cc/vT1BQmhk/HELEXO-CATALOG-129.png',
'https://i.postimg.cc/KjdY4ys3/HELEXO-CATALOG-130.png',
'https://i.postimg.cc/WzQ4tPfh/HELEXO-CATALOG-131.png',
'https://i.postimg.cc/D0tzmKYW/HELEXO-CATALOG-132.png',
'https://i.postimg.cc/qq97gdZc/HELEXO-CATALOG-133.png',
'https://i.postimg.cc/cCVJ6N5D/HELEXO-CATALOG-134.png',
'https://i.postimg.cc/053jVp2P/HELEXO-CATALOG-135.png',
'https://i.postimg.cc/wxPMwhTx/HELEXO-CATALOG-136.png',
'https://i.postimg.cc/c1jCFQ4t/HELEXO-CATALOG-137.png',
'https://i.postimg.cc/gc5jgvk8/HELEXO-CATALOG-138.png',
'https://i.postimg.cc/wxPMwhTN/HELEXO-CATALOG-139.png',
'https://i.postimg.cc/Wbk3Chht/HELEXO-CATALOG-140.png',
'https://i.postimg.cc/MKQTNvvV/HELEXO-CATALOG-141.png',
'https://i.postimg.cc/MKQTNvv3/HELEXO-CATALOG-142.png',
'https://i.postimg.cc/Gmn2CdD0/HELEXO-CATALOG-143.png',
'https://i.postimg.cc/52W0VbzJ/HELEXO-CATALOG-144.png',
'https://i.postimg.cc/L8FXp2PR/HELEXO-CATALOG-145.png',
'https://i.postimg.cc/qvHRT4KB/HELEXO-CATALOG-146.png',
'https://i.postimg.cc/9QPfXKPV/HELEXO-CATALOG-147.png',
'https://i.postimg.cc/Jz3h7v3t/HELEXO-CATALOG-148.png',
'https://i.postimg.cc/R0XVKtDz/HELEXO-CATALOG-149.png',
'https://i.postimg.cc/43BNVcSX/HELEXO-CATALOG-150.png',
'https://i.postimg.cc/KYJvBTH3/HELEXO-CATALOG-151.png',
'https://i.postimg.cc/fLyWKbGy/HELEXO-CATALOG-152.png',
'https://i.postimg.cc/k4GMc50W/HELEXO-CATALOG-153.png',
'https://i.postimg.cc/k4GMc50K/HELEXO-CATALOG-154.png',
'https://i.postimg.cc/4dy453D1/HELEXO-CATALOG-155.png',
'https://i.postimg.cc/85YpnSG0/HELEXO-CATALOG-156.png',
'https://i.postimg.cc/xCZfF2QW/HELEXO-CATALOG-157.png',
'https://i.postimg.cc/MTL6rSwC/HELEXO-CATALOG-158.png',
'https://i.postimg.cc/LXW90pR2/HELEXO-CATALOG-159.png',
'https://i.postimg.cc/d3TqbxtV/HELEXO-CATALOG-160.png',
'https://i.postimg.cc/RhnMkDVS/HELEXO-CATALOG-161.png',
'https://i.postimg.cc/T1WRz4Y1/HELEXO-CATALOG-162.png',
'https://i.postimg.cc/FzJ9MBs1/HELEXO-CATALOG-163.png',
'https://i.postimg.cc/x8b0w4TJ/HELEXO-CATALOG-164.png',
'https://i.postimg.cc/fy0wGrTY/HELEXO-CATALOG-165.png',
'https://i.postimg.cc/z3ZJ8FVv/HELEXO-CATALOG-166.png',
'https://i.postimg.cc/t7QXpNY7/HELEXO-CATALOG-167.png',
'https://i.postimg.cc/grFYmHnn/HELEXO-CATALOG-168.png',
'https://i.postimg.cc/CdTFSszR/HELEXO-CATALOG-169.png',
  ];

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = isMobile ? catalogImages.length : Math.ceil(catalogImages.length / 2);

  const goToPreviousPage = () => {
    if (currentPage > 0 && !isFlipping && !isMobile) {
      setFlipDirection('right');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setTimeout(() => {
          setIsFlipping(false);
          setFlipDirection(null);
        }, 300);
      }, 150);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping && !isMobile) {
      setFlipDirection('left');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setTimeout(() => {
          setIsFlipping(false);
          setFlipDirection(null);
        }, 300);
      }, 150);
    }
  };

  // Get current content based on device
  const getCurrentContent = () => {
    if (isMobile) {
      return {
        single: catalogImages[currentPage]
      };
    } else {
      const startIndex = currentPage * 2;
      return {
        left: catalogImages[startIndex],
        right: catalogImages[startIndex + 1]
      };
    }
  };

  const content = getCurrentContent();

  // Handle PDF download
  const handleDownload = () => {
    const pdfUrl = 'https://drive.google.com/file/d/1c2I0y8WvH9zcqtGa71NdEAYAUEeJ4WSg/view?usp=sharing';
    window.open(pdfUrl, '_blank');
  };

  // Keyboard navigation (only for desktop)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isMobile) {
        if (e.key === 'ArrowLeft') {
          goToPreviousPage();
        } else if (e.key === 'ArrowRight') {
          goToNextPage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isFlipping, isMobile]);

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1>TRIONE MORTISE CATALOGUE 2025</h1>
        <p className="catalog-subtitle">
          {isMobile 
            ? `${catalogImages.length} Pages` 
            : `Spread ${currentPage + 1} of ${totalPages}`}
        </p>
      </div>

      <div className="book-container">
        <div className={`book-spread ${isMobile ? 'mobile-view' : ''} ${isFlipping ? `flipping-${flipDirection}` : ''}`}>
          {isMobile ? (
            // Mobile: Vertical scroll view
            <div className="mobile-scroll-view">
              {catalogImages.map((image, index) => (
                <div key={index} className="mobile-page-item">
                  <img 
                    src={image} 
                    alt={`Catalog page ${index + 1}`}
                    className="mobile-page-image"
                    loading="lazy"
                  />
                  <div className="mobile-page-number">Page {index + 1}</div>
                </div>
              ))}
            </div>
          ) : (
            // Desktop: Two-page spread
            <>
              {/* Left Page */}
              <div className="book-page left-page">
                {content.left && (
                  <img 
                    src={content.left} 
                    alt={`Catalog page ${currentPage * 2 + 1}`}
                    className="page-image"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Right Page */}
              <div className="book-page right-page">
                {content.right && (
                  <img 
                    src={content.right} 
                    alt={`Catalog page ${currentPage * 2 + 2}`}
                    className="page-image"
                    loading="lazy"
                  />
                )}
              </div>
            </>
          )}
        </div>

        {/* Desktop Navigation Controls - Hidden on Mobile */}
        {!isMobile && (
          <>
            <div className="navigation-controls">
              <button 
                className="nav-button prev-button"
                onClick={goToPreviousPage}
                disabled={currentPage === 0 || isFlipping}
              >
                <span className="nav-icon">◀</span>
                Previous
              </button>

              <div className="page-indicator">
                <span className="current-page">{currentPage + 1}</span>
                <span className="separator">/</span>
                <span className="total-pages">{totalPages}</span>
              </div>

              <button 
                className="nav-button next-button"
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1 || isFlipping}
              >
                Next
                <span className="nav-icon">▶</span>
              </button>
            </div>

            <div className="keyboard-hint">
              ← Use keyboard arrows to flip pages →
            </div>
          </>
        )}

        {/* Download Button - Visible on all devices */}
        <div className="download-section">
          <button 
            className="download-button"
            onClick={handleDownload}
          >
            <span className="download-icon">📥</span>
            Download Full Catalog (PDF)
            <span className="download-icon">📄</span>
          </button>
          <p className="download-info">Complete TRIONE Mortise Catalogue 2025 • 52 pages</p>
        </div>
      </div>
    </div>
  );
};

export default Catalog;