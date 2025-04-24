import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Select from "react-select";
import CategoryService from "../../services/controllers/category/category.service";
import PropTypes from "prop-types";

const SelectCategory = ({setCategoryId}) => {
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('');

  const {
    data: categories,
    isLoading,
  } = useQuery({
    queryKey: ["categories", search],
    queryFn: async () => {
      return await CategoryService.getAll(
        { 
          search, 
          page_size: 10,
          only: "id,name"
        }
      );
    },
  });

    const customStyles = {
        placeholder: (base) => ({
            ...base,
            color: 'white', 
          }),
        control: (base, state) => ({
          ...base,
          color: 'white', 
          backgroundColor: '#1a56db',
          borderColor: state.isFocused ? 'gray' : '#ccc'
        }),
        input: (base) => ({
            ...base,
            color: 'white',
          }),
        singleValue: (base) => ({
          ...base,
          color: 'white', 
        }),
      };

    const handleChange = (selectedOption) => {
        setCategoryId(selectedOption ? selectedOption.value : 0);
    };

    const handleInputChange = (inputValue) => {
        setSearch(inputValue);
    };

    useEffect(() => {
        if (categories?.data && Array.isArray(categories.data)) {
            setOptions(categories.data.map(item => ({
                value: item.id,
                label: item.name
            })));
        }
    }, [categories]);

  return (
    <>
       <Select
            styles={customStyles}
            isLoading={isLoading}
            isClearable
            placeholder="Cari kategori ..."
            name="color" 
            onChange={handleChange}
            onInputChange={handleInputChange}
            options={options}
        />
    </>
  );
};

SelectCategory.propTypes = {
  setCategoryId: PropTypes.func.isRequired
};

export default SelectCategory;