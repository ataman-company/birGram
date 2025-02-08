import UserPanelDatePicker from "@/components/userPanel/UserPanelDatePicker";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Accordion,
  AccordionItem,
  CheckboxGroup,
  Checkbox,
} from "@nextui-org/react";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";

const FilterModal = ({ open, change }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [selectedStatusTransactions, setSelectedStatusTransactions] = useState(
    []
  );

  const transactionTypes = [
    "واریز",
    "برداشت",
    "خرید ملی",
    "فروش ملی",
    "انتقال ملی",
    "دریافت شمش طلا",
    "دریافت کارت هدیه",
    "خرید کارت هدیه",
    "دریافت هدیه ملی",
    "تراکنش اصلاحی",
    "شارژ سیستمی",
  ];

  const transactionStatusTypes = ["موفق", "ناموفق", "در حال انجام"];

  const applyFilters = () => {
    console.log("Selected Transactions:", selectedTransactions);
    console.log("Selected Status Transactions:", selectedStatusTransactions);
    console.log("From Date:", fromDate);
    console.log("To Date:", toDate);
  };

  return (
    <Modal
      isOpen={open}
      onOpenChange={change}
      placement="bottom"
      size="full"
      className="max-w-2xl rounded-t-2xl bg-white shadow-lg"
    >
      <ModalContent>
        <ModalHeader className="text-lg font-semibold text-center border-b py-3">
          فیلترها
        </ModalHeader>
        <ModalBody className="space-y-4 p-4">
          <Accordion>
            <AccordionItem key="1" aria-label="نوع تراکنش" title="نوع تراکنش">
              <CheckboxGroup
                value={selectedTransactions}
                onChange={setSelectedTransactions}
              >
                {transactionTypes.map((item, index) => (
                  <Checkbox
                    key={index}
                    value={item}
                    className="text-sm text-gray-700 py-1"
                  >
                    {item}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </AccordionItem>

            <AccordionItem
              key="2"
              aria-label="وضعیت تراکنش"
              title="وضعیت تراکنش"
            >
              <CheckboxGroup
                value={selectedStatusTransactions}
                onChange={setSelectedStatusTransactions}
              >
                {transactionStatusTypes.map((item, index) => (
                  <Checkbox
                    key={index}
                    value={item}
                    className="text-sm text-gray-700 py-1"
                  >
                    {item}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </AccordionItem>
          </Accordion>

          {/* Date Picker */}
          <div className="flex flex-col  px-6 space-y-3">
            <span className="text-sm text-gray-600">تاریخ تراکنش</span>
            {/* <div className="flex flex-col sm:flex-row justify-between gap-2">
              <UserPanelDatePicker setdate={setFromDate} />
              <UserPanelDatePicker setdate={setToDate} />
            </div> */}

            <div className="flex sm:flex-row flex-col justify-between gap-2">
              <div className="w-full">
                <span className="text-sm text-gray-600">از تاریخ</span>
                <UserPanelDatePicker setdate={setFromDate} />
              </div>
              <div className="w-full">
                <span className="text-sm  text-gray-600">تا تاریخ</span>
                <UserPanelDatePicker setdate={setToDate} />
              </div>
            </div>
            {/* <div className="flex justify-between  gap-2"></div> */}
          </div>
        </ModalBody>

        {/* Footer: Apply Filter Button */}
        <ModalFooter className="p-4">
          <Button
            className="w-full bg-primary text-white p-3 rounded-lg"
            onPress={applyFilters}
          >
            اعمال فیلتر
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FilterModal;
