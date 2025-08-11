import supabase from "../supabase-client"

export default function useFunction(){
    const renderProducts = async () => {
        try{
        const { data:productData, error:productError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

        if(productError){
            throw productError
        }

        return {success: true , data: productData}
        }catch(error:any){
        console.error('Error fetching product:', error)
        return { 
            success: false, 
            error: error.message || 'Getting product failed' 
        }
        }
    }
    return { renderProducts }
}