import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Button,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Member } from '../../types';

interface MemberDetailProps {
  member: Member | null;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
}

const DetailImage = styled('img')({
  width: '100%',
  maxWidth: 300,
  height: 300,
  objectFit: 'cover',
  borderRadius: 8,
  marginBottom: 16,
});

const TagsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: theme.spacing(1),
}));

export const MemberDetail = ({ member, open, onClose, onEdit }: MemberDetailProps) => {
  if (!member) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          position: 'relative',
        },
      }}
    >
      <DialogTitle sx={{ pb: 0 }}>
        <Typography variant="h5" component="div" gutterBottom>
          {member.name}
        </Typography>
        <CloseButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </CloseButton>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 2,
          }}
        >
          <DetailImage src={member.imageUrl} alt={member.name} />

          <TagsContainer>
            {member.tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                sx={{
                  backgroundColor: tag.color,
                  color: 'white',
                }}
              />
            ))}
          </TagsContainer>

          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', width: '100%' }}>
            {member.introduction}
          </Typography>

          {member.isEditable && (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={onEdit}
              sx={{ mt: 3 }}
            >
              編集する
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
