'use client'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Button, Input, Textarea } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'

function page() {
    return (
        <>
            <div className="bg-blue-50">
                <div className="bg-gradient-to-r from-blue-950 to-blue-800">
                    <div className="container pb-3 mx-auto relative px-3">
                        <Header />
                    </div>
                </div>
                <section className='my-4 flex flex-col gap-3 container mx-auto px-20'>
                    <h1 className='text-2xl text-blue-900 font-bold'>تماس با بیرگرم</h1>
                    <div className='w-1/12 p-1 border-t-2 border-b-2 border-t-yellow-500 border-b-yellow-500'></div>
                    <p>لطفا قبل از تماس با بیرگرم، ابتدا پرسش‌‌های متداول را مشاهده کنید.</p>
                    <div className='flex flex-col gap-3'>
                        <Input type="text" classNames={{ inputWrapper: "bg-white border" }} label="نام و نام خانوادگی" />
                        <Input type="number" classNames={{ inputWrapper: "bg-white border" }} label="شماره تماس" />
                        <Input type="email" classNames={{ inputWrapper: "bg-white border" }} label="ایمیل" />
                        <Textarea classNames={{ inputWrapper: "bg-white border" }} className="" label="متن شما" />
                        <label htmlFor="file">اگر فایلی دارید آپلود کنید : </label>
                        <input type='file' id='file' />
                        <Button className='bg-blue-950 text-white'>ثبت و ارسال</Button>
                    </div>

                    <h1 className='text-2xl text-blue-900 font-bold'> اطلاعات تماس با بیرگرم </h1>
                    <div className='w-1/12 p-1 border-t-2 border-b-2 border-t-yellow-500 border-b-yellow-500'></div>
                    <h1 className='text-2xl text-blue-900 font-bold'>آدرس دفتر بیر گرم</h1>
                    <p>تهران، بلوار نلسون ماندلا، نرسیده به چهارراه جهان کودک کوچه ناوک، پلاک ۶، طبقه ۱</p>
                    <div className='p-10 bg-gray-200 flex flex-col gap-1 items-center rounded-2xl mx-20'>
                        <Image width={34} height={34} src={"/icons/email2.svg"} alt='email' />
                        <h1 className='text-2xl text-blue-900 font-bold'>ایمیل مکاتبات اداری بیرگرم</h1>
                        <span>info@birgeram.gold</span>
                    </div>
                    <h1 className='text-2xl text-blue-900 font-bold'>خزانه تحویل و فروشگاه بیرگرم</h1>
                    <p>بازار بزرگ تهران، خیابان ناصرخسرو، پاساژ شمس العماره، طبقه منفی ۲، پلاک ۲۳۹</p>
                    <h1 className='text-2xl text-blue-900 font-bold'>پشتیبانی آنلاین و تلفنی بیرگرم</h1>
                    <div className='w-1/12 p-1 border-t-2 border-b-2 border-t-yellow-500 border-b-yellow-500'></div>
                    <div className='flex flex-wrap gap-y-5'>
                        <div className="w-1/2 flex flex-col gap-2 items-center">
                            <Image width={34} height={34} src={"/icons/hedset.svg"} alt='' />
                            <h1 className='text-xl text-blue-900 font-bold'>شماره تلفن پشتیبانی</h1>
                            <p>021-91200150</p>
                        </div>
                        <div className="items-center w-1/2 flex flex-col gap-2">
                            <Image width={34} height={34} src={"/icons/email2.svg"} alt='' />
                            <h1 className='text-xl text-blue-900 font-bold'>ایمیل پشتیبانی کاربران بیرگرم</h1>
                            <p>021-91200150</p>
                        </div>
                        <div className=" w-1/2 flex flex-col gap-2 items-center">
                            <Image width={34} height={34} src={"/icons/phone2.svg"} alt='' />
                            <h1 className='text-xl text-blue-900 font-bold'>شماره تلفن پشتیبانی</h1>
                            <p>021-91200150</p>
                        </div>
                        <div className="w-1/2 items-center flex flex-col gap-2">
                            <Image width={34} height={34} src={"/icons/calendar2.svg"} alt='' />
                            <h1 className='text-xl text-blue-900 font-bold'>شماره تلفن پشتیبانی</h1>
                            <p>021-91200150</p>
                        </div>
                        <div className='flex justify-evenly w-full'>
                            <Button className='bg-blue-950 text-yellow-400' size='lg'>خرید طلای آب‌شده از بیرگرم</Button>
                            <Button variant='bordered' className='border border-blue-950' size='lg'>درباره بیرگرم</Button>
                        </div>
                    </div>
                </section>

            </div>
            <Footer />
        </>
    )
}

export default page
